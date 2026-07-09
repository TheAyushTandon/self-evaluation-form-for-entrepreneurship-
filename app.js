/* =========================================================
   ETTLQ — Application Logic
   ========================================================= */

// ── State ────────────────────────────────────────────────
const state = {
  currentScreen: 'landing',
  currentQuestion: 0,
  faculty: { name: '', email: '', phone: '', department: '' },
  declaration: false,
  answers: [],           // { id, dimension, label, score, color }
  shuffledQuestions: null,
  startTime: null,
  result: null,
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

// Helper: Shuffle Array
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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
    
    // Shuffle options for all questions once per attempt
    state.shuffledQuestions = ETC_QUESTIONS.map(q => {
      return {
        ...q,
        shuffledOptions: shuffleArray(q.options)
      };
    });
    
    renderQuestion();
    showScreen('screen-question');
  });
}

// ── Questions ────────────────────────────────────────────
function checkAllAnswered() {
  return ETC_QUESTIONS.every(q => state.answers.some(a => a.id === q.id));
}

function renderQuestionGrid() {
  const grid = $('question-navigator-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  ETC_QUESTIONS.forEach((q, idx) => {
    const item = document.createElement('div');
    const isAttempted = state.answers.some(a => a.id === q.id);
    const isActive = idx === state.currentQuestion;
    
    item.className = `q-grid-item ${isAttempted ? 'attempted' : ''} ${isActive ? 'active' : ''}`;
    item.textContent = idx + 1;
    
    item.addEventListener('click', () => {
      jumpToQuestion(idx);
    });
    grid.appendChild(item);
  });
}

function jumpToQuestion(index) {
  if (index < 0 || index >= ETC_QUESTIONS.length || index === state.currentQuestion) return;
  const el = $('q-anim-wrapper');
  
  const direction = index > state.currentQuestion ? 'left' : 'right';
  el.classList.add(direction === 'left' ? 'slide-out-left' : 'slide-out-right');
  
  setTimeout(() => {
    state.currentQuestion = index;
    renderQuestion();
    el.className = `w-full ${direction === 'left' ? 'slide-in-right' : 'slide-in-left'}`;
    el.offsetWidth; // Force reflow
    el.className = 'w-full';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 380);
}

function renderQuestion() {
  const questionsList = state.shuffledQuestions || ETC_QUESTIONS;
  const q   = questionsList[state.currentQuestion];
  const num = state.currentQuestion + 1;
  const tot = questionsList.length;

  // Set header to show the Question Number
  $('q-text').textContent = `Question Q${num}.`;
  $('q-counter').textContent = `${num} / ${tot}`;

  // Options Stack
  const container = $('q-options');
  container.innerHTML = '';

  const prevAnswer = state.answers.find(a => a.id === q.id);

  // Use pre-shuffled options if available
  const optionsToRender = q.shuffledOptions || shuffleArray(q.options);

  optionsToRender.forEach((opt, idx) => {
    const div = document.createElement('div');
    div.className = `option-card stagger-item`;
    div.style.animationDelay = `${idx * 90}ms`;
    if (prevAnswer && prevAnswer.label === opt.text) div.classList.add('selected');
    
    // Custom option layout
    div.innerHTML = `
      <div class="option-content" style="text-align: left; width: 100%; font-size: 0.95rem; line-height: 1.6; font-weight: 500;">
        ${opt.text}
      </div>
    `;
    div.addEventListener('click', () => selectOption(q, opt, div));
    container.appendChild(div);
  });

  // Back / Next buttons
  $('btn-q-back').style.display = state.currentQuestion === 0 ? 'none' : 'flex';
  $('btn-q-next').textContent = num === tot ? 'Submit Assessment →' : 'Continue →';
  $('btn-q-next').disabled = !prevAnswer;

  renderQuestionGrid();
  updateProgressBar();
}

function selectOption(q, opt, el) {
  // Store answer
  const existing = state.answers.findIndex(a => a.id === q.id);
  const answer = {
    id: q.id,
    dimension: q.dimension,
    label: opt.text,
    score: Number(opt.score),
    color: opt.color,
  };
  if (existing >= 0) state.answers[existing] = answer;
  else state.answers.push(answer);

  // Visual feedback
  $$('.option-card').forEach(c => c.classList.remove('selected'));
  if (el) el.classList.add('selected');
  $('btn-q-next').disabled = false;

  renderQuestionGrid();

  // Auto-advance after short delay on non-last questions
  if (state.currentQuestion < ETC_QUESTIONS.length - 1) {
    setTimeout(() => advanceQuestion(), 550);
  }
}

function advanceQuestion() {
  const questionsList = state.shuffledQuestions || ETC_QUESTIONS;
  const answered = state.answers.find(a => a.id === questionsList[state.currentQuestion].id);

  if (state.currentQuestion < questionsList.length - 1) {
    if (!answered) return;
    const el = $('q-anim-wrapper');
    el.classList.add('slide-out-left');
    setTimeout(() => {
      state.currentQuestion++;
      renderQuestion();
      el.className = 'w-full slide-in-right';
      el.offsetWidth; // Force reflow
      el.className = 'w-full';
      $('screen-question').scrollTop = 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 380);
  } else {
    // Check if all questions are answered before submitting
    if (!checkAllAnswered()) {
      const firstUnansweredIdx = questionsList.findIndex(q => !state.answers.some(a => a.id === q.id));
      showErrorToast(`Please answer all questions before submitting. Directing you to unanswered Question Q${firstUnansweredIdx + 1}.`);
      jumpToQuestion(firstUnansweredIdx);
      return;
    }
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
      el.offsetWidth; // Force reflow
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
  const MAX_RETRIES = 3;

  try {
    if (!CONFIG.APPS_SCRIPT_URL || CONFIG.APPS_SCRIPT_URL.includes('YOUR_')) {
      // Demo mode — calculate locally
      result = buildLocalResult(sortedAnswers, completionTime);
    } else {
      let lastError = null;
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        const res = await fetch(CONFIG.APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(payload),
        });
        result = await res.json();

        if (result.success) break; // done

        if (result.retryable && attempt < MAX_RETRIES) {
          // Server busy — wait 2 seconds and retry silently
          await new Promise(r => setTimeout(r, 2000));
          lastError = result.error;
          continue;
        }

        throw new Error(result.error || 'Submission failed.');
      }
      if (!result || !result.success) {
        throw new Error(lastError || 'Submission failed after multiple attempts.');
      }
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
  const total = answers.reduce((s, a) => s + Number(a.score), 0);
  const profile = getTeachingProfile(total);

  return {
    success: true,
    submissionId: 'ETTLQ-DEMO-' + Math.floor(10000 + Math.random() * 90000),
    score: total,
    profile: profile.title,
  };
}

// ── Result screen ─────────────────────────────────────────
function renderResult(r) {
  const profile = getTeachingProfile(r.score);

  // Score big
  const scoreEl = $('result-score-num');
  animateCounter(scoreEl, 0, r.score, 1200);

  // Profile Badge
  $('result-profile-badge').innerHTML = `<span>${profile.title}</span>`;

  // Profile Remarks Card
  $('remarks-title').textContent = profile.title;
  $('remarks-interpretation').textContent = profile.description;
  $('remarks-wayforward').textContent = profile.wayForward;

  // Render Detailed Answer Key
  const akWrap = $('result-answer-key');
  akWrap.innerHTML = '';

  ETC_QUESTIONS.forEach(q => {
    const myAns = state.answers.find(a => a.id === q.id);
    const selectedText = myAns ? myAns.label : '';

    const greenOpt = q.options.find(o => o.color === 'green');
    const yellowOpt = q.options.find(o => o.color === 'yellow');
    const redOpt = q.options.find(o => o.color === 'red');

    const isGreenSelected = selectedText === greenOpt.text;
    const isYellowSelected = selectedText === yellowOpt.text;
    const isRedSelected = selectedText === redOpt.text;

    const item = document.createElement('div');
    item.className = 'review-item';
    item.innerHTML = `
      <div class="review-header">
        <span class="review-dimension-title">${q.id}. ${q.dimension}</span>
      </div>
      <div class="review-options-list">
        <div class="review-option green-opt ${isGreenSelected ? 'selected-ans' : ''}">
          <span style="font-size:1.1rem; line-height:1; flex-shrink:0;">🟢</span>
          <span style="flex:1;">${greenOpt.text}</span>
          ${isGreenSelected ? '<span class="selection-badge">Your Choice</span>' : ''}
        </div>
        <div class="review-option yellow-opt ${isYellowSelected ? 'selected-ans' : ''}">
          <span style="font-size:1.1rem; line-height:1; flex-shrink:0;">🟡</span>
          <span style="flex:1;">${yellowOpt.text}</span>
          ${isYellowSelected ? '<span class="selection-badge">Your Choice</span>' : ''}
        </div>
        <div class="review-option red-opt ${isRedSelected ? 'selected-ans' : ''}">
          <span style="font-size:1.1rem; line-height:1; flex-shrink:0;">🔴</span>
          <span style="flex:1;">${redOpt.text}</span>
          ${isRedSelected ? '<span class="selection-badge">Your Choice</span>' : ''}
        </div>
      </div>
    `;
    akWrap.appendChild(item);
  });

  // Confetti
  launchConfetti();
  
  // Success Toast
  showSuccessToast();
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

function showSuccessToast() {
  const t = document.createElement('div');
  t.className = 'toast-success';
  t.innerHTML = `
    <h3 style="font-family:'Dosis',sans-serif;font-weight:700;margin-bottom:6px;color:var(--accent-hover);font-size:1.1rem;">
      Evaluation Recorded
    </h3>
    <p style="line-height:1.5;margin:0;">
      Thank you for completing the Entrepreneurial Teaching & Transformative Learning Quotient diagnostic. Your results have been compiled successfully.
    </p>
  `;
  document.body.appendChild(t);
  
  setTimeout(() => {
    t.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    t.style.opacity = '0';
    t.style.transform = 'translate(-50%, 20px)';
    setTimeout(() => t.remove(), 400);
  }, 4500);
}

// ── PDF Download ─────────────────────────────────────────
function downloadPDF() {
  const r = state.result;
  if (!r) return;

  const profile = getTeachingProfile(r.score);
  const faculty = state.faculty;

  // Build color legend rows
  const colorMap = { green: '#d1fae5', yellow: '#fef9c3', red: '#fee2e2' };
  const borderMap = { green: '#10b981', yellow: '#f59e0b', red: '#ef4444' };
  const labelMap  = { green: 'Green — Absolutely like an entrepreneurial Educator',
                      yellow: 'Yellow — Somewhat like an entrepreneurial Educator',
                      red:    'Red — Totally unlike an entrepreneurial Educator' };

  // Subtle tints for non-selected options so color is still visible
  const bgFaint  = { green: '#f0fdf4', yellow: '#fefce8', red: '#fff5f5' };

  let answerRows = '';
  ETC_QUESTIONS.forEach((q, idx) => {
    const myAns = state.answers.find(a => a.id === q.id);
    const selectedText = myAns ? myAns.label : '';

    const orderedOptions = ['green', 'yellow', 'red'].map(c => q.options.find(o => o.color === c)).filter(Boolean);

    const colorLabel = { green: 'Green', yellow: 'Yellow', red: 'Red' };

    let optionRows = '';
    orderedOptions.forEach(opt => {
      const isSelected = selectedText === opt.text;
      const bg     = isSelected ? colorMap[opt.color] : bgFaint[opt.color];
      const border  = borderMap[opt.color];
      const opacity = isSelected ? '1' : '0.75';
      const weight  = isSelected ? '600' : '400';
      const badge   = isSelected
        ? `<span style="margin-left:8px;font-size:10px;font-weight:700;color:${border};background:${colorMap[opt.color]};padding:2px 8px;border-radius:20px;white-space:nowrap;border:1px solid ${border};">&#10003; Your Choice</span>`
        : `<span style="margin-left:8px;font-size:10px;font-weight:600;color:${border};opacity:0.7;white-space:nowrap;">${colorLabel[opt.color]}</span>`;
      optionRows += `<div style="display:flex;align-items:flex-start;gap:8px;padding:9px 12px;background:${bg};border-left:4px solid ${border};border-bottom:1px solid #e2e8f0;font-size:11.5px;color:#1e293b;line-height:1.55;opacity:${opacity};font-weight:${weight};"><span style="flex:1;">${opt.text}</span>${badge}</div>`;
    });

    answerRows += `<div style="border:1px solid #e2e8f0;border-radius:8px;margin-bottom:14px;overflow:hidden;"><div style="background:#f8f9fa;padding:9px 14px;font-size:12px;font-weight:700;color:#0f172a;border-bottom:1px solid #e2e8f0;letter-spacing:0.3px;">${idx + 1}. ${q.id}. ${q.dimension}</div>${optionRows}</div>`;
  });

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ETTLQ Results — ${faculty.name}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #0f172a; padding: 32px; max-width: 740px; margin: 0 auto; }
    h1 { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
    .meta { font-size: 12px; color: #64748b; margin-bottom: 24px; }
    .score-box { background: #ecfdf5; border: 1px solid #10b981; border-radius: 10px; padding: 20px 24px; margin-bottom: 24px; display: flex; align-items: center; gap: 20px; }
    .score-num { font-size: 52px; font-weight: 800; color: #059669; line-height: 1; }
    .score-detail h2 { font-size: 14px; font-weight: 700; color: #065f46; margin-bottom: 4px; }
    .score-detail p { font-size: 12px; color: #047857; line-height: 1.5; }
    .legend { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px; }
    .legend-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #475569; margin-bottom: 8px; }
    .legend-row { font-size: 12px; color: #475569; margin-bottom: 4px; }
    .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #475569; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
    @media print {
      body { padding: 16px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <h1>ETTLQ Diagnostic Results</h1>
  <div class="meta">
    ${faculty.name} &nbsp;·&nbsp; ${faculty.email} &nbsp;·&nbsp; ${faculty.department}
    &nbsp;·&nbsp; Generated: ${new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}
  </div>

  <div class="score-box">
    <div class="score-num">${r.score}</div>
    <div class="score-detail">
      <h2>Your ETTLQ Score</h2>
      <p>${profile.title}</p>
    </div>
  </div>

  <div class="legend">
    <div class="legend-title">What does each color mean?</div>
    <div class="legend-row">🟢 <strong>Green:</strong> Absolutely like an entrepreneurial Educator</div>
    <div class="legend-row">🟡 <strong>Yellow:</strong> Somewhat like an entrepreneurial Educator</div>
    <div class="legend-row">🔴 <strong>Red:</strong> Totally unlike an entrepreneurial Educator</div>
  </div>

  <div class="section-title">Your Responses — All 26 Dimensions</div>
  ${answerRows}

  <script>window.onload = function(){ window.print(); }<\/script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    // Fallback if popup blocked
    const a = document.createElement('a');
    a.href = url;
    a.download = `ETTLQ-Results-${faculty.name.replace(/\s+/g, '-')}.html`;
    a.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

// ── Bootstrap ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLanding();
  initInfo();
  initDeclaration();
  initQuestion();
  showScreen('screen-landing');
});
