/* =========================================================
   ETC — Application Logic
   ========================================================= */

// ── State ────────────────────────────────────────────────
const state = {
  currentScreen: 'landing',
  currentQuestion: 0,
  faculty: { name: '', email: '', phone: '', department: '' },
  declaration: false,
  answers: [],           // { id, dimension, label, score, recommendations }
  startTime: null,
  result: null,
  leaderboard: [],
};

// ── DOM refs ─────────────────────────────────────────────
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

// ── SVG Icon Registry ────────────────────────────────────
// Elegant minimalist line SVG icons representing dimensions
function getSvgIcon(iconName) {
  const icons = {
    active: `<svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    brainstorm: `<svg viewBox="0 0 24 24"><path d="M9.5 2A6.5 6.5 0 0 1 16 8.5c0 1.62-.6 3.1-1.58 4.24L15 15h-6l.58-2.26A6.5 6.5 0 0 1 9.5 2z" stroke-linecap="round"/><path d="M8 18h8M9 21h6"/></svg>`,
    collab: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    design: `<svg viewBox="0 0 24 24"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M12 8V16"/><path d="M8 12H16"/></svg>`,
    learning: `<svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12.5V18l6 3 6-3v-5.5"/></svg>`,
    failure: `<svg viewBox="0 0 24 24"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-1.19"/></svg>`,
    growth: `<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    empathy: `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    innovation: `<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    time: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    transfer: `<svg viewBox="0 0 24 24"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M3 3l6.59 6.59"/></svg>`,
    leadership: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    mentoring: `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 12zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
    networking: `<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 7.51l-6.82 3.98"/></svg>`,
    opportunity: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>`,
    problem: `<svg viewBox="0 0 24 24"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"/></svg>`,
    quality: `<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>`,
    risk: `<svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>`,
    stakeholder: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>`,
    tech: `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    uncertainty: `<svg viewBox="0 0 24 24"><path d="M2 12h20M12 2v20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/></svg>`,
    value: `<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>`,
    career: `<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    cross: `<svg viewBox="0 0 24 24"><path d="M7 2L3 6h18M17 22l4-4H3"/></svg>`,
    yield: `<svg viewBox="0 0 24 24"><path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6"/></svg>`,
    zero: `<svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>`,
  };
  return icons[iconName] || `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`;
}

// ── Screen navigation ────────────────────────────────────
function showScreen(id) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  const s = $(id);
  s.classList.add('active');
  s.scrollIntoView({ behavior: 'smooth', block: 'start' });
  state.currentScreen = id;
  updateProgressBar();
}

function updateProgressBar() {
  const total = 4 + ETC_QUESTIONS.length;
  const map = {
    'screen-landing': 0,
    'screen-info': 1,
    'screen-declaration': 2,
    'screen-result': total,
    'screen-leaderboard': total,
  };
  let done = map[state.currentScreen] !== undefined
    ? map[state.currentScreen]
    : 3 + state.currentQuestion;

  const pct = Math.round((done / total) * 100);
  $('progress-fill').style.width = pct + '%';
  $('progress-label').textContent = state.currentScreen.startsWith('screen-q')
    ? `Question ${state.currentQuestion + 1} of ${ETC_QUESTIONS.length}`
    : '';
}

// ── Landing ──────────────────────────────────────────────
function initLanding() {
  $('btn-start').addEventListener('click', () => showScreen('screen-info'));
  fetchLeaderboardPreview();
}

async function fetchLeaderboardPreview() {
  if (!CONFIG.APPS_SCRIPT_URL || CONFIG.APPS_SCRIPT_URL.includes('YOUR_')) return;
  try {
    const res = await fetch(CONFIG.APPS_SCRIPT_URL);
    const data = await res.json();
    if (data.success && data.totalParticipants) {
      $('landing-participants').textContent = data.totalParticipants + '+ Faculty';
    }
  } catch (_) { /* silent */ }
}

// ── Faculty Info ─────────────────────────────────────────
function initInfo() {
  $('btn-info-next').addEventListener('click', submitInfo);
  ['info-name','info-email','info-phone','info-dept'].forEach(id => {
    $(id).addEventListener('input', () => clearError(id));
    $(id).addEventListener('keydown', e => { if (e.key === 'Enter') submitInfo(); });
  });
}

function submitInfo() {
  const name  = $('info-name').value.trim();
  const email = $('info-email').value.trim();
  const phone = $('info-phone').value.trim();
  const dept  = $('info-dept').value.trim();

  let valid = true;
  if (!name)  { setError('info-name',  'Full name is required.'); valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('info-email', 'A valid email address is required.'); valid = false;
  }
  if (!phone || !/^[\d\s\-+()]{7,15}$/.test(phone)) {
    setError('info-phone', 'A valid phone number is required.'); valid = false;
  }
  if (!dept)  { setError('info-dept',  'Department is required.'); valid = false; }
  if (!valid) return;

  state.faculty = { name, email, phone, department: dept };
  $('declaration-name').textContent = name;
  showScreen('screen-declaration');
}

function setError(id, msg) {
  $(id).classList.add('error');
  const err = document.createElement('p');
  err.className = 'error-text mt-4'; err.id = id + '-err'; err.textContent = msg;
  const existing = $(id + '-err');
  if (existing) existing.remove();
  $(id).parentElement.appendChild(err);
}

function clearError(id) {
  $(id).classList.remove('error');
  const err = $(id + '-err');
  if (err) err.remove();
}

// ── Declaration ──────────────────────────────────────────
function initDeclaration() {
  const cb   = $('decl-checkbox');
  const btn  = $('btn-decl-next');
  const wrap = $('decl-wrap');

  wrap.addEventListener('click', () => {
    state.declaration = !state.declaration;
    cb.classList.toggle('checked', state.declaration);
    wrap.classList.toggle('checked', state.declaration);
    btn.disabled = !state.declaration;
  });

  $('btn-decl-back').addEventListener('click', () => showScreen('screen-info'));
  btn.addEventListener('click', () => {
    if (!state.declaration) return;
    state.startTime = Date.now();
    state.currentQuestion = 0;
    state.answers = [];
    renderQuestion();
    showScreen('screen-question');
  });
}

// ── Questions ────────────────────────────────────────────
function renderQuestion() {
  const q   = ETC_QUESTIONS[state.currentQuestion];
  const num = state.currentQuestion + 1;
  const tot = ETC_QUESTIONS.length;

  $('q-dimension').innerHTML = `
    ${getSvgIcon(q.icon)}
    <span class="dim-id">${q.id}</span>
    <span>${q.dimension}</span>
  `;
  $('q-counter').textContent = `${num} / ${tot}`;
  $('q-text').textContent = q.question;

  // Options Stack
  const container = $('q-options');
  container.innerHTML = '';

  const prevAnswer = state.answers.find(a => a.id === q.id);

  RESPONSE_OPTIONS.forEach((opt, idx) => {
    const div = document.createElement('div');
    div.className = `option-card stagger-item`;
    div.style.animationDelay = `${idx * 90}ms`;
    if (prevAnswer && prevAnswer.label === opt.label) div.classList.add('selected');
    div.innerHTML = `
      <div class="option-content">
        <div class="option-label">${opt.label}</div>
        <div class="option-desc">${opt.description}</div>
      </div>
    `;
    div.addEventListener('click', () => selectOption(q, opt, div));
    container.appendChild(div);
  });

  // Back / Next buttons
  $('btn-q-back').style.display = state.currentQuestion === 0 ? 'none' : 'flex';
  $('btn-q-next').textContent = num === tot ? 'Submit Assessment →' : 'Continue →';
  $('btn-q-next').disabled = !prevAnswer;

  updateProgressBar();
}

function selectOption(q, opt, el) {
  // Store answer
  const existing = state.answers.findIndex(a => a.id === q.id);
  const answer = {
    id: q.id,
    dimension: q.dimension,
    label: opt.label,
    score: opt.score,
    recommendations: q.recommendations,
  };
  if (existing >= 0) state.answers[existing] = answer;
  else state.answers.push(answer);

  // Visual feedback
  $$('.option-card').forEach(c => c.classList.remove('selected'));
  if (el) el.classList.add('selected');
  $('btn-q-next').disabled = false;

  // Auto-advance after short delay on non-last questions
  if (state.currentQuestion < ETC_QUESTIONS.length - 1) {
    setTimeout(() => advanceQuestion(), 550);
  }
}

function advanceQuestion() {
  const answered = state.answers.find(a => a.id === ETC_QUESTIONS[state.currentQuestion].id);
  if (!answered) return;

  if (state.currentQuestion < ETC_QUESTIONS.length - 1) {
    const el = $('q-anim-wrapper');
    el.classList.add('slide-out-left');
    setTimeout(() => {
      state.currentQuestion++;
      renderQuestion();
      el.className = 'w-full slide-in-right';
      el.offsetWidth; // Force layout recalculation (reflow)
      el.className = 'w-full';
      $('screen-question').scrollTop = 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 380);
  } else {
    submitAssessment();
  }
}

function goBackQuestion() {
  if (state.currentQuestion > 0) {
    const el = $('q-anim-wrapper');
    el.classList.add('slide-out-right');
    setTimeout(() => {
      state.currentQuestion--;
      renderQuestion();
      el.className = 'w-full slide-in-left';
      el.offsetWidth; // Force layout recalculation (reflow)
      el.className = 'w-full';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 380);
  } else {
    showScreen('screen-declaration');
  }
}

function initQuestion() {
  $('btn-q-next').addEventListener('click', advanceQuestion);
  $('btn-q-back').addEventListener('click', goBackQuestion);
}

// ── Submission ───────────────────────────────────────────
async function submitAssessment() {
  const overlay = $('submit-overlay');
  overlay.classList.add('active');

  const completionTime = Math.round((Date.now() - state.startTime) / 1000);

  // Sort answers A–Z
  const sortedAnswers = [...state.answers].sort((a, b) => a.id.localeCompare(b.id));

  const payload = {
    faculty: state.faculty,
    declaration: state.declaration,
    answers: sortedAnswers,
    completionTime,
  };

  let result;

  try {
    if (!CONFIG.APPS_SCRIPT_URL || CONFIG.APPS_SCRIPT_URL.includes('YOUR_')) {
      // Demo mode — calculate locally
      result = buildLocalResult(sortedAnswers, completionTime);
    } else {
      const res = await fetch(CONFIG.APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      result = await res.json();
      if (!result.success) throw new Error(result.error || 'Submission failed.');
    }
  } catch (err) {
    overlay.classList.remove('active');
    showErrorToast(err.message || 'Could not reach the server. Please try again.');
    return;
  }

  state.result = result;
  overlay.classList.remove('active');
  renderResult(result);
  showScreen('screen-result');
}

// Demo/offline result builder
function buildLocalResult(answers, completionTime) {
  const total = answers.reduce((s, a) => s + a.score, 0);
  const profile = getTeachingProfile(total);
  const strengths = answers.filter(a => a.score === 3).map(a => a.dimension);
  const growthDims = answers.filter(a => a.score === -1);
  const recommendations = growthDims.map(a => ({ dimension: a.dimension, tips: a.recommendations }));

  return {
    success: true,
    submissionId: 'ETC-DEMO',
    score: total,
    rank: 1,
    participants: 1,
    profile: profile.title,
    strengths,
    growthAreas: growthDims.map(a => a.dimension),
    recommendations,
    leaderboard: [{
      rank: 1, name: state.faculty.name,
      department: state.faculty.department, score: total, profile: profile.title
    }],
  };
}

// ── Result screen ─────────────────────────────────────────
function renderResult(r) {
  const profile = getTeachingProfile(r.score);
  const pct = ((r.score - CONFIG.MIN_SCORE) / (CONFIG.MAX_SCORE - CONFIG.MIN_SCORE)) * 100;

  // Rank sentence
  $('result-rank-line').textContent =
    `You are ranked #${r.rank} out of ${r.participants} faculty member${r.participants !== 1 ? 's' : ''}.`;

  // Score big
  const scoreEl = $('result-score-num');
  animateCounter(scoreEl, 0, r.score, 1200);

  // Meter
  setTimeout(() => {
    const fill = $('result-meter-fill');
    fill.style.width = Math.max(0, pct) + '%';
  }, 200);

  // Profile
  $('result-profile-badge').innerHTML = `
    <span>${profile.title}</span>
  `;
  $('result-profile-desc').textContent = profile.description;

  // Submission ID
  $('result-sub-id').textContent = r.submissionId;

  // Stats row
  $('stat-max').textContent = CONFIG.MAX_SCORE;
  $('stat-pct').textContent = Math.round(pct) + '%';
  $('stat-parts').textContent = r.participants;

  // Strengths
  const strWrap = $('result-strengths');
  strWrap.innerHTML = '';
  if (r.strengths && r.strengths.length) {
    r.strengths.forEach(s => {
      const chip = document.createElement('span');
      chip.className = 'chip chip-green'; chip.textContent = s;
      strWrap.appendChild(chip);
    });
  } else {
    strWrap.innerHTML = '<span class="chip">Strengths are building!</span>';
  }

  // Growth areas
  const growWrap = $('result-growth');
  growWrap.innerHTML = '';
  if (r.growthAreas && r.growthAreas.length) {
    r.growthAreas.slice(0, 6).forEach(g => {
      const chip = document.createElement('span');
      chip.className = 'chip'; chip.textContent = g;
      growWrap.appendChild(chip);
    });
  } else {
    growWrap.innerHTML = '<span class="chip chip-green">Outstanding! No critical growth gaps found.</span>';
  }

  // Recommendations
  const recWrap = $('result-recs');
  recWrap.innerHTML = '';
  if (r.recommendations && r.recommendations.length) {
    r.recommendations.slice(0, 5).forEach(rec => {
      const qObj = ETC_QUESTIONS.find(q => q.dimension === rec.dimension);
      const iconHtml = qObj ? getSvgIcon(qObj.icon) : '';
      const card = document.createElement('div');
      card.className = 'rec-card stagger-item';
      card.innerHTML = `<div class="rec-dimension" style="display:flex;align-items:center;gap:8px;">${iconHtml}<span>${rec.dimension}</span></div>` +
        rec.tips.map(t => `<div class="rec-tip">${t}</div>`).join('');
      recWrap.appendChild(card);
    });
  }

  // Leaderboard
  renderLeaderboard(r.leaderboard, r.submissionId);

  // Populate Certificate Data
  $('cert-faculty-name').textContent = state.faculty.name;
  $('cert-profile-title').textContent = profile.title;
  $('cert-score').textContent = `${r.score} / ${CONFIG.MAX_SCORE}`;
  $('cert-date').textContent = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  $('cert-verification-id').textContent = r.submissionId;

  // Wire Download Buttons
  $('btn-download-cert').onclick = () => window.print();
  $('btn-download-report').onclick = () => downloadReport(r);

  // Confetti
  launchConfetti();
}

function downloadReport(r) {
  const profile = getTeachingProfile(r.score);
  const timestamp = new Date().toLocaleString();

  let text = `=========================================================
ENTREPRENEURIAL TEACHING CANVAS (ETC) REPORT
=========================================================

FACULTY DETAILS:
Name:        ${state.faculty.name}
Department:  ${state.faculty.department}
Email:       ${state.faculty.email}
Phone:       ${state.faculty.phone}
Date/Time:   ${timestamp}
Submission:  ${r.submissionId}

---------------------------------------------------------
ASSESSMENT SUMMARY:
Total Score: ${r.score} / 78
Rank:        #${r.rank} out of ${r.participants} participants
Profile:     ${profile.title}

---------------------------------------------------------
PROFILE DESCRIPTION:
${profile.description}

---------------------------------------------------------
STRENGTHS:
${r.strengths && r.strengths.length ? r.strengths.map(s => `+ ${s}`).join('\n') : 'No primary strengths identified yet.'}

---------------------------------------------------------
GROWTH OPPORTUNITIES:
${r.growthAreas && r.growthAreas.length ? r.growthAreas.map(g => `- ${g}`).join('\n') : 'No immediate growth gaps identified.'}

---------------------------------------------------------
RECOMMENDED ACTION ITEMS:
`;

  if (r.recommendations && r.recommendations.length) {
    r.recommendations.forEach(rec => {
      text += `\n* ${rec.dimension}:\n`;
      rec.tips.forEach(tip => {
        text += `  - ${tip}\n`;
      });
    });
  } else {
    text += '\nKeep up the excellent practice!';
  }

  text += `\n=========================================================
Report generated by Entrepreneurial Teaching Canvas Platform.
=========================================================`;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ETC_Assessment_Report_${state.faculty.name.replace(/\s+/g, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function renderLeaderboard(lb, myId) {
  const wrap = $('result-leaderboard');
  wrap.innerHTML = '';
  if (!lb || lb.length === 0) {
    wrap.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No leaderboard data yet.</p>';
    return;
  }
  lb.forEach(entry => {
    const isMe = entry.submissionId === myId;
    const rankClass = entry.rank === 1 ? 'top1' : entry.rank === 2 ? 'top2' : entry.rank === 3 ? 'top3' : '';
    const row = document.createElement('div');
    row.className = `leaderboard-row stagger-item${isMe ? ' is-me' : ''}`;
    row.innerHTML = `
      <div class="lb-rank ${rankClass}">#${entry.rank}</div>
      <div class="lb-info">
        <div class="lb-name">${entry.name}${isMe ? ' <span style="color:var(--accent);font-size:0.75rem;font-weight:bold;">(You)</span>' : ''}</div>
        <div class="lb-dept">${entry.department}</div>
      </div>
      <div class="lb-score">${entry.score}</div>
    `;
    wrap.appendChild(row);
  });
}

// ── Counter animation ────────────────────────────────────
function animateCounter(el, from, to, duration) {
  const start = performance.now();
  const isNeg = to < 0;
  const abs = Math.abs(to);
  const absFrom = Math.abs(from);

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(absFrom + (abs - absFrom) * eased);
    el.textContent = (isNeg ? '-' : '') + current;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── Confetti ─────────────────────────────────────────────
function launchConfetti() {
  const colors = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const dot = document.createElement('div');
      dot.className = 'confetti-dot';
      dot.style.left = Math.random() * 100 + 'vw';
      dot.style.top = '-10px';
      dot.style.background = colors[Math.floor(Math.random() * colors.length)];
      dot.style.width = (4 + Math.random() * 6) + 'px';
      dot.style.height = (4 + Math.random() * 6) + 'px';
      dot.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 3000);
    }, Math.random() * 800);
  }
}

// ── Toast ────────────────────────────────────────────────
function showErrorToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:#ffffff;border:1px solid #ef4444;color:#ef4444;
    padding:14px 24px;border-radius:12px;font-size:0.85rem;font-weight:600;
    z-index:9999;box-shadow:var(--shadow-elevated);
    animation:fadeUp 0.3s ease;max-width:90vw;text-align:center;
  `;
  t.textContent = '⚠ ' + msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 5000);
}

// ── Bootstrap ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLanding();
  initInfo();
  initDeclaration();
  initQuestion();
  showScreen('screen-landing');
});
