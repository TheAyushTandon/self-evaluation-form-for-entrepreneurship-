// =========================================================
// ETC — Google Apps Script Backend
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

const SHEET_NAME = "ETC_Responses";
const SUBMISSION_PREFIX = "ETC-";

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
    questionHeaders.push(`${l} Label`);
    questionHeaders.push(`${l} Score`);
  });

  const end = [
    "Total Score",
    "Teaching Profile",
    "Strengths",
    "Growth Areas",
    "Leaderboard Rank",
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
  const scoreMap = {
    "Consistently Practice": 3,
    "Occasionally Practice": 1,
    "Opportunity for Growth": -1,
  };
  return answers.reduce((total, a) => total + (scoreMap[a.label] || 0), 0);
}

// ── Profile determination ─────────────────────────────────
function getTeachingProfile(score) {
  if (score >= 65) return "Innovation Champion";
  if (score >= 40) return "Growth-Oriented Educator";
  return "Emerging Entrepreneurial Practitioner";
}

// ── Strengths & Growth Areas ──────────────────────────────
function analyzeAnswers(answers) {
  const scoreMap = { "Consistently Practice": 3, "Occasionally Practice": 1, "Opportunity for Growth": -1 };

  const scored = answers.map((a) => ({
    dimension: a.dimension,
    score: scoreMap[a.label] || 0,
    label: a.label,
    recommendations: a.recommendations || [],
  }));

  scored.sort((a, b) => b.score - a.score);

  const strengths = scored.filter((a) => a.score === 3).map((a) => a.dimension);
  const growthAreas = scored.filter((a) => a.score === -1);

  const recommendations = [];
  growthAreas.forEach((area) => {
    if (area.recommendations && area.recommendations.length > 0) {
      recommendations.push({
        dimension: area.dimension,
        tips: area.recommendations,
      });
    }
  });

  return {
    strengths,
    growthAreas: growthAreas.map((a) => a.dimension),
    recommendations,
  };
}

// ── Leaderboard builder ───────────────────────────────────
function buildLeaderboard(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];

  const totalScoreCol = 7 + 26 * 2 + 1; // after base(7) + question cols(52) = col 60
  const data = sheet.getRange(2, 1, lastRow - 1, totalScoreCol + 4).getValues();

  const entries = data
    .filter((row) => row[0]) // has timestamp
    .map((row) => ({
      timestamp: row[0],
      submissionId: row[1],
      name: row[2],
      department: row[3],
      email: row[4],
      score: Number(row[totalScoreCol - 1]),
      profile: row[totalScoreCol],
    }));

  // Sort: highest score, then earliest submission
  entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  const uniqueEntries = [];
  const seenEmails = new Set();
  entries.forEach((e) => {
    const emailKey = String(e.email).trim().toLowerCase();
    if (!seenEmails.has(emailKey)) {
      seenEmails.add(emailKey);
      uniqueEntries.push(e);
    }
  });

  return uniqueEntries.map((e, i) => ({
    rank: i + 1,
    name: e.name,
    department: e.department,
    score: e.score,
    profile: e.profile,
    submissionId: e.submissionId,
  }));
}

// ── Update rank column ────────────────────────────────────
function updateRanks(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return;

  const totalScoreCol = 60;
  const rankCol = totalScoreCol + 3; // Leaderboard Rank column

  const data = sheet.getRange(2, 1, lastRow - 1, totalScoreCol + 4).getValues();

  const rows = data
    .map((row, i) => ({
      rowIndex: i + 2,
      timestamp: row[0],
      email: row[4],
      score: Number(row[totalScoreCol - 1])
    }))
    .filter((r) => r.timestamp);

  rows.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  const seenEmails = new Set();
  let currentRank = 1;
  rows.forEach((row) => {
    const emailKey = String(row.email).trim().toLowerCase();
    if (!seenEmails.has(emailKey)) {
      seenEmails.add(emailKey);
      sheet.getRange(row.rowIndex, rankCol).setValue(currentRank);
      currentRank++;
    } else {
      sheet.getRange(row.rowIndex, rankCol).setValue(""); // duplicate entry gets no rank value
    }
  });
}

// ── Leaderboard averages ──────────────────────────────────
function getStats(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return { average: 0, highest: 0, total: 0 };

  const totalScoreCol = 60;
  const data = sheet.getRange(2, 1, lastRow - 1, totalScoreCol + 4).getValues();

  const rows = data
    .filter((row) => row[0])
    .map((row) => ({
      email: row[4],
      score: Number(row[totalScoreCol - 1])
    }));

  const uniqueScores = [];
  const seenEmails = new Set();
  rows.forEach((row) => {
    const emailKey = String(row.email).trim().toLowerCase();
    if (!seenEmails.has(emailKey)) {
      seenEmails.add(emailKey);
      uniqueScores.push(row.score);
    }
  });

  if (uniqueScores.length === 0) return { average: 0, highest: 0, total: 0 };

  return {
    average: Math.round(uniqueScores.reduce((s, v) => s + v, 0) / uniqueScores.length),
    highest: Math.max(...uniqueScores),
    total: uniqueScores.length,
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
      return corsOutput({ success: false, error: "Declaration not accepted." });
    }
    if (!answers || answers.length !== 26) {
      return corsOutput({ success: false, error: "Incomplete assessment. All 26 questions are required." });
    }

    const validLabels = ["Consistently Practice", "Occasionally Practice", "Opportunity for Growth"];
    for (const a of answers) {
      if (!validLabels.includes(a.label)) {
        return corsOutput({ success: false, error: `Invalid response: "${a.label}"` });
      }
    }

    // --- Scoring ---
    const totalScore = calculateScore(answers);
    const profile = getTeachingProfile(totalScore);
    const { strengths, growthAreas, recommendations } = analyzeAnswers(answers);

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
    const scoreMap = { "Consistently Practice": 3, "Occasionally Practice": 1, "Opportunity for Growth": -1 };
    answers.forEach((a) => {
      row.push(a.label);
      row.push(scoreMap[a.label]);
    });

    // Tail columns
    row.push(totalScore);
    row.push(profile);
    row.push(strengths.join(", "));
    row.push(growthAreas.join(", "));
    row.push(""); // Rank — filled after
    row.push(completionTime || 0);

    sheet.appendRow(row);

    // Update all ranks
    updateRanks(sheet);

    // Get fresh rank for this submission
    const idCol = 2;
    const lastRow = sheet.getLastRow();
    const allIds = sheet.getRange(2, idCol, lastRow - 1, 1).getValues().flat();
    const myRowIndex = allIds.indexOf(submissionId) + 2;
    const rankCol = 63; // Leaderboard Rank column index
    const myRank = sheet.getRange(myRowIndex, rankCol).getValue();

    // Leaderboard top 10
    const leaderboard = buildLeaderboard(sheet).slice(0, 10);
    const stats = getStats(sheet);

    return corsOutput({
      success: true,
      submissionId,
      score: totalScore,
      rank: myRank,
      participants: stats.total,
      averageScore: stats.average,
      highestScore: stats.highest,
      profile,
      strengths,
      growthAreas,
      recommendations,
      leaderboard,
    });
  } catch (err) {
    return corsOutput({ success: false, error: err.message });
  }
}

// ── GET handler — /api/leaderboard ───────────────────────
function doGet(e) {
  try {
    const sheet = initSheet();
    const leaderboard = buildLeaderboard(sheet).slice(0, 10);
    const stats = getStats(sheet);

    return corsOutput({
      success: true,
      leaderboard,
      totalParticipants: stats.total,
      averageScore: stats.average,
      highestScore: stats.highest,
    });
  } catch (err) {
    return corsOutput({ success: false, error: err.message });
  }
}
