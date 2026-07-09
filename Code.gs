// =========================================================
// ETTLQ — Google Apps Script Backend
// Deploy this as a Web App via Extensions → Apps Script
// Execution: Anyone | Access: Anyone (anonymous)
// =========================================================
//
// SETUP INSTRUCTIONS:
// 1. Open the target Google Sheet.
// 2. Click Extensions → Apps Script.
// 3. Paste this entire file into Code.gs.
// 4. Click Deploy → New Deployment → Web App.
// 5. Set "Execute as: Me" and "Who has access: Anyone".
// 6. Copy the Web App URL and paste it into config.js (APPS_SCRIPT_URL).
// 7. Reload the sheet — the header row will auto-initialize on first run.
//
// =========================================================

const SHEET_NAME = "ETTLQ_Responses";
const SUBMISSION_PREFIX = "ETTLQ-";

// ── Column definitions ────────────────────────────────────
function getHeaders() {
  const base = [
    "Timestamp",
    "Submission ID",
    "Name",
    "Department",
    "Email",
    "Phone Number",
    "Declaration Accepted",
  ];

  const questionHeaders = [];
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  letters.forEach((l) => {
    questionHeaders.push(`${l} Selected Text`);
    questionHeaders.push(`${l} Score`);
  });

  const end = [
    "Total Score",
    "Teaching Profile",
    "Strengths",
    "Growth Areas",
    "Completion Time (seconds)",
  ];

  return [...base, ...questionHeaders, ...end];
}

// ── Sheet initialiser ─────────────────────────────────────
function initSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    const headers = getHeaders();
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

// ── Next submission ID ────────────────────────────────────
function getNextSubmissionId(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return SUBMISSION_PREFIX + "00001";
  const idCol = 2; // Submission ID column
  const ids = sheet
    .getRange(2, idCol, lastRow - 1, 1)
    .getValues()
    .flat()
    .filter((v) => v && String(v).startsWith(SUBMISSION_PREFIX));
  if (ids.length === 0) return SUBMISSION_PREFIX + "00001";
  const numbers = ids.map((id) => parseInt(String(id).replace(SUBMISSION_PREFIX, ""), 10));
  const next = Math.max(...numbers) + 1;
  return SUBMISSION_PREFIX + String(next).padStart(5, "0");
}

// ── Score calculation ─────────────────────────────────────
function calculateScore(answers) {
  return answers.reduce((total, a) => total + (a.score !== undefined ? Number(a.score) : 0), 0);
}

// ── Profile determination ─────────────────────────────────
function getTeachingProfile(score) {
  if (score > 60) return "The Entrepreneurial Educator facilitating a Transformative Learning Lab";
  if (score >= 40) return "The Transitioning Launchpad";
  return "The Spark Phase";
}

// ── Strengths & Growth Areas ──────────────────────────────
function analyzeAnswers(answers) {
  const scored = answers.map((a) => ({
    dimension: a.dimension,
    score: a.score !== undefined ? Number(a.score) : 0,
    label: a.label,
  }));

  scored.sort((a, b) => b.score - a.score);

  const strengths = scored.filter((a) => a.score === 3).map((a) => a.dimension);
  const growthAreas = scored.filter((a) => a.score === -1);

  return {
    strengths,
    growthAreas: growthAreas.map((a) => a.dimension),
  };
}



// ── CORS headers ──────────────────────────────────────────
function corsOutput(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ── POST handler — /api/submit ────────────────────────────
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const { faculty, declaration, answers, completionTime } = payload;

    // --- Validation ---
    if (!faculty || !faculty.name || !faculty.email || !faculty.phone || !faculty.department) {
      return corsOutput({ success: false, error: "Missing faculty information." });
    }
    if (!declaration) {
      return corsOutput({ success: false, error: "Declaration / Consent not accepted." });
    }
    if (!answers || answers.length !== 26) {
      return corsOutput({ success: false, error: "Incomplete assessment. All 26 questions are required." });
    }

    for (const a of answers) {
      const s = Number(a.score);
      if (s !== 3 && s !== 1 && s !== -1) {
        return corsOutput({ success: false, error: `Invalid response score: "${a.score}"` });
      }
    }

    // --- Scoring ---
    const totalScore = calculateScore(answers);
    const profile = getTeachingProfile(totalScore);
    const { strengths, growthAreas } = analyzeAnswers(answers);

    // --- Sheet ---
    const sheet = initSheet();
    const submissionId = getNextSubmissionId(sheet);
    const timestamp = new Date();

    // Build row
    const row = [
      timestamp,
      submissionId,
      faculty.name.trim(),
      faculty.department.trim(),
      faculty.email.trim().toLowerCase(),
      faculty.phone.trim(),
      "TRUE",
    ];

    // Add each answer (label + score)
    answers.forEach((a) => {
      row.push(a.label);
      row.push(a.score);
    });

    // Tail columns
    row.push(totalScore);
    row.push(profile);
    row.push(strengths.join(", "));
    row.push(growthAreas.join(", "));
    row.push(completionTime || 0);

    sheet.appendRow(row);

    return corsOutput({
      success: true,
      submissionId,
      score: totalScore,
      profile,
      strengths,
      growthAreas,
    });
  } catch (err) {
    return corsOutput({ success: false, error: err.message });
  }
}
