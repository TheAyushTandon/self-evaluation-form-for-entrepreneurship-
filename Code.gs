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

// ── Sheet initialiser (must be called inside a lock) ──────
function initSheet(ss) {
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

// ── Submission ID: timestamp + random — no race condition ─
// Format: ETTLQ-20240709-A3F7
function generateSubmissionId() {
  const now = new Date();
  const date = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyyMMdd");
  const rand = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${SUBMISSION_PREFIX}${date}-${rand}`;
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
  }));

  const strengths   = scored.filter((a) => a.score === 3).map((a) => a.dimension);
  const growthAreas = scored.filter((a) => a.score === -1).map((a) => a.dimension);

  return { strengths, growthAreas };
}

// ── CORS output ───────────────────────────────────────────
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
      return corsOutput({ success: false, error: "Declaration not accepted." });
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

    // --- Scoring (done before the lock — pure CPU, no I/O) ---
    const totalScore   = calculateScore(answers);
    const profile      = getTeachingProfile(totalScore);
    const { strengths, growthAreas } = analyzeAnswers(answers);
    const submissionId = generateSubmissionId();
    const timestamp    = new Date();

    // Build row (done before lock for speed)
    const row = [
      timestamp,
      submissionId,
      faculty.name.trim(),
      faculty.department.trim(),
      faculty.email.trim().toLowerCase(),
      faculty.phone.trim(),
      "TRUE",
    ];
    answers.forEach((a) => {
      row.push(a.label);
      row.push(a.score);
    });
    row.push(totalScore);
    row.push(profile);
    row.push(strengths.join(", "));
    row.push(growthAreas.join(", "));
    row.push(completionTime || 0);

    // --- Sheet write with lock (prevents concurrent corruption) ---
    const lock = LockService.getScriptLock();
    const acquired = lock.tryLock(8000); // wait up to 8 seconds for the lock

    if (!acquired) {
      // Another execution is holding the lock — ask the client to retry
      return corsOutput({
        success: false,
        error: "Server is busy. Please wait a moment and try again.",
        retryable: true,
      });
    }

    try {
      const ss    = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = initSheet(ss);
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

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
