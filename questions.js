// =========================================================
// ETTLQ Assessment Questions — 26 Dimensions (A–Z)
// =========================================================

const ETC_QUESTIONS = [
  {
    id: "A",
    dimension: "Action Bias",
    icon: "active",
    options: [
      { score: -1, color: "red", text: "Students spend the first month only reading syllabus textbooks and in the best case writing a synopsis." },
      { score: 1, color: "yellow", text: "Students spend the first two weeks on theory, but by Week 3 they submit a rough, 1-page bullet-point outline or hand-drawn concept map." },
      { score: 3, color: "green", text: "Students create a messy, working layout, raw outline, or code snippet within the first 10 days of the module." }
    ]
  },
  {
    id: "B",
    dimension: "Boundary-Pushing",
    icon: "cross",
    options: [
      { score: -1, color: "red", text: "All assignments and project data come strictly from your own textbook, branch, or department." },
      { score: 1, color: "yellow", text: "The project is rooted in your subject, but students must read and cite one example or case study from a different field (e.g., an engineering project citing an environmental law)." },
      { score: 3, color: "green", text: "The course forces students to apply cross-disciplinary skills (e.g., a B.Tech 1st yr interviewing local vendors, or a Liberal Arts student building an excel budget)" }
    ]
  },
  {
    id: "C",
    dimension: "Customer Discovery",
    icon: "empathy",
    options: [
      { score: -1, color: "red", text: "Data for student projects comes entirely from secondary internet research, Wikipedia, or ChatGPT." },
      { score: 1, color: "yellow", text: "Students don't leave campus, but they create a Google Form survey and get responses from at least 15 real people outside their immediate friend circle." },
      { score: 3, color: "green", text: "Students must step outside the campus gate, interview 5 real-world stakeholders (shopkeepers, auto-drivers, residents), and include direct quotes/notes in their report." }
    ]
  },
  {
    id: "D",
    dimension: "De-risking Failure",
    icon: "failure",
    options: [
      { score: -1, color: "red", text: "Every single assignment or quiz throughout the semester carries proportional weightage and directly impacts their final course grade/marks." },
      { score: 1, color: "yellow", text: "You give one \"practice assignment\" early on. You mark it strictly to show them where they stand, but the grade doesn't count toward their final university submission." },
      { score: 3, color: "green", text: "The first two mini-challenges are graded purely on completion, effort, and risk-taking, giving them total freedom to fail and fix it without GPA panic." }
    ]
  },
  {
    id: "E",
    dimension: "Endurance Mindset",
    icon: "growth",
    options: [
      { score: -1, color: "red", text: "If a student team's initial idea doesn't work, they lose marks as that’s fair." },
      { score: 1, color: "yellow", text: "If a team's project fails mid-semester, you allow them to submit a \"Failure Analysis Report\" explaining why it failed to recover 50% of the lost marks." },
      { score: 3, color: "green", text: "Your course evaluation explicitly rewards the process: a designated percentage of marks is reserved for how effectively a team diagnosed, tackled, and resolved a major project roadblock." }
    ]
  },
  {
    id: "F",
    dimension: "Friction",
    icon: "problem",
    options: [
      { score: -1, color: "red", text: "Every lecture begins with standard definitions, formulas, and theorems shown on the screen/blackboard." },
      { score: 1, color: "yellow", text: "You start the lecture with a standard definition, but immediately follow it with a confusing, real-world counter-example that challenges the definition." },
      { score: 3, color: "green", text: "Every module begins with an unsolved, messy real-world case or system failure before any theoretical definitions or formulas are introduced." }
    ]
  },
  {
    id: "G",
    dimension: "Gallery Walk",
    icon: "networking",
    options: [
      { score: -1, color: "red", text: "You sit at your desk for hours watching one student group after another read bullet points off a PPT screen while the rest of the class sleeps." },
      { score: 1, color: "yellow", text: "You still do standard PPT presentations, but you randomize who speaks, and every listening student is forced to grade their peers using a simple feedback sheet." },
      { score: 3, color: "green", text: "You always run a Project Mela. All teams pin a 1-page chart on the wall simultaneously, and the entire room buzzes as they evaluate each other." }
    ]
  },
  {
    id: "H",
    dimension: "Handoff",
    icon: "transfer",
    options: [
      { score: -1, color: "red", text: "Class time is 100% occupied by you writing on the board/reading slides." },
      { score: 1, color: "yellow", text: "You lecture for 35 minutes, leaving the final 15 minutes for students to solve a textbook problem in pairs." },
      { score: 3, color: "green", text: "Students watch a 10-minute conceptual video at home; the entire 50-minute class is spent actively running a simulation or building solutions." }
    ]
  },
  {
    id: "I",
    dimension: "I Like, I Wish, What If",
    icon: "brainstorm",
    options: [
      { score: -1, color: "red", text: "When students present, peer feedback is either non-existent or devolves into quiet murmuring and vague \"good job\" comments." },
      { score: 1, color: "yellow", text: "You ask students to give one positive and one negative comment on their classmates' presentations." },
      { score: 3, color: "green", text: "The entire class is trained to use the formal matrix: I Like (what worked), I Wish (the core gap), and What If (a creative solution alternative)." }
    ]
  },
  {
    id: "J",
    dimension: "Jugaad to Structure",
    icon: "value",
    options: [
      { score: -1, color: "red", text: "Students submit highly rigid, textbook-perfect theories that have no connection to localized, ground-level resource constraints." },
      { score: 1, color: "yellow", text: "You praise a student's clever, makeshift solution but stop there, without pushing them to explain how it could work reliably at scale." },
      { score: 3, color: "green", text: "Assignments demand that students first show a low-cost hack, then explicitly map out the formal, institutional blueprint to make it permanent." }
    ]
  },
  {
    id: "K",
    dimension: "Key Performance Indicators",
    icon: "yield",
    options: [
      { score: -1, color: "red", text: "Assignments are graded purely on the number of pages written, neat formatting, and matching the textbook answer key exactly." },
      { score: 1, color: "yellow", text: "You split the grade: 60-70% for accuracy of the textbook answer, 30-40% for neatness and presentation style." },
      { score: 3, color: "green", text: "80% of the grade relies on verified real-world execution progress/milestones reached by the team's project." }
    ]
  },
  {
    id: "L",
    dimension: "Lightning Talks",
    icon: "leadership",
    options: [
      { score: -1, color: "red", text: "Students are given unlimited time to meander through presentations, hiding their lack of clarity behind dense academic concepts/jargon." },
      { score: 1, color: "yellow", text: "You set a 5-minute timer for presentations, but you always allow them to overflow without consequence." },
      { score: 3, color: "green", text: "Use a hard 180-second \"Stopwatch Rule.\" Students must pitch their core value proposition cleanly before the timer buzzes." }
    ]
  },
  {
    id: "M",
    dimension: "MVP (Minimum Viable Product)",
    icon: "design",
    options: [
      { score: -1, color: "red", text: "You evaluate the students' progress mainly via the final end-of-semester exam." },
      { score: 1, color: "yellow", text: "Students must show you a mid-term draft or wireframe on their laptops before they print the final report, ensuring they are on the right track." },
      { score: 3, color: "green", text: "Students must present a rough, zero-cost mock-up, cardboard model, or 1-page blueprint by Week 2 to get feedback before building anything else." }
    ]
  },
  {
    id: "N",
    dimension: "Net Opportunity",
    icon: "opportunity",
    options: [
      { score: -1, color: "red", text: "Problems are solved in a vacuum where budgets, time, and human effort are treated as infinite and costless." },
      { score: 1, color: "yellow", text: "You ask students to include a basic, static \"cost estimation\" section at the end of their project reports." },
      { score: 3, color: "green", text: "Every assignment operates under tight, realistic resource scarcity (e.g., \"You have only 5 days, 3 people, and ₹5,000 to execute this framework\")." }
    ]
  },
  {
    id: "O",
    dimension: "Osmotic Learning",
    icon: "learning",
    options: [
      { score: -1, color: "red", text: "Your students can recite textbook definitions perfectly but fail to apply them to an unfamiliar case study or real-world problem." },
      { score: 1, color: "yellow", text: "You teach the theory first, but immediately run a 15-minute classroom game or roleplay where they have to use that theory in action." },
      { score: 3, color: "green", text: "Students participate in a practical exercise, simulation, or experiment first, discovering the academic principle naturally before you formally name it on the board." }
    ]
  },
  {
    id: "P",
    dimension: "Pivot",
    icon: "uncertainty",
    options: [
      { score: -1, color: "red", text: "If an experiment, data set, or hypothesis fails mid-semester, then the student’s project hits a dead-end and gets penalized." },
      { score: 1, color: "yellow", text: "When a student project hits a wall, you allow them to change their project goals, provided they write a formal justification letter to you." },
      { score: 3, color: "green", text: "Your syllabus includes a designated \"twist\" in which you intentionally introduce a sudden constraint, and teams are graded on how cleanly they adapt." }
    ]
  },
  {
    id: "Q",
    dimension: "Question Storming",
    icon: "quality",
    options: [
      { score: -1, color: "red", text: "You always ask, \"Any questions?\" at the end of a long lecture, but mostly get a dead silence from the room." },
      { score: 1, color: "yellow", text: "You select three specific students during class and prompt them to ask a question about the lecture topic." },
      { score: 3, color: "green", text: "You give teams 5 minutes to generate 20 deep questions about a messy case study, grading them on the sharpness and depth of their inquiry." }
    ]
  },
  {
    id: "R",
    dimension: "Retro",
    icon: "mentoring",
    options: [
      { score: -1, color: "red", text: "After the mid-term exams, you grade the students and hand them grades and never discuss the questions of the mid-term in your next class." },
      { score: 1, color: "yellow", text: "You spend 10 minutes at the start of class reviewing the common mistakes made by the batch in the mid-term exam." },
      { score: 3, color: "green", text: "Run a dedicated 60-minute \"Exam Question Review\" where you and the students analyse the process of reaching at a solution." }
    ]
  },
  {
    id: "S",
    dimension: "Scarcity Injection",
    icon: "risk",
    options: [
      { score: -1, color: "red", text: "Students are given months of loose deadlines, leading to last-minute copy-pasting from old senior projects." },
      { score: 1, color: "yellow", text: "You suddenly move a deadline forward by 2 days to see how the class handles a minor schedule acceleration." },
      { score: 3, color: "green", text: "Activities are structurally designed around tight constraints (e.g., \"Solve this engineering glitch using only components currently available inside this specific desk drawer\")." }
    ]
  },
  {
    id: "T",
    dimension: "Time-Boxing",
    icon: "time",
    options: [
      { score: -1, color: "red", text: "You give students 40 minutes of open, unstructured class time to \"discuss project ideas\" while they browse their phones." },
      { score: 1, color: "yellow", text: "You tell teams they have \"about 10 minutes\" to finish a task, without tracking it visually on a screen." },
      { score: 3, color: "green", text: "Use a giant, visible countdown digital timer on the projector screen. If a task requires 20 minutes, give them 14." }
    ]
  },
  {
    id: "U",
    dimension: "User Empathy",
    icon: "empathy",
    options: [
      { score: -1, color: "red", text: "Students build solutions tailored exclusively to pass a theoretical grading rubric, completely ignoring whether a real human being could use it." },
      { score: 1, color: "yellow", text: "You ask students to add a short paragraph to their report detailing who their target end-user is." },
      { score: 3, color: "green", text: "Students must build an \"Empathy Map\" tracking the daily frustrations, language barriers, and habits of the person they are designing for." }
    ]
  },
  {
    id: "V",
    dimension: "‘Velocity of Learning’ Management",
    icon: "tech",
    options: [
      { score: -1, color: "red", text: "You track students’ learning progress only via mid-sem or end-sem exams." },
      { score: 1, color: "yellow", text: "You use a monthly progress tracking quiz." },
      { score: 3, color: "green", text: "Your students have to maintain a public 3-column tracking board (To Do, In Progress, Done) that you scan visually every week." }
    ]
  },
  {
    id: "W",
    dimension: "Work-in-Public",
    icon: "career",
    options: [
      { score: -1, color: "red", text: "No student ever gets to see the assignment/exam paper of their classmates." },
      { score: 1, color: "yellow", text: "You pick one brave student team to share even their unfinished rough draft on the screen for class review." },
      { score: 3, color: "green", text: "All team rough drafts are hosted on a shared digital drive or pinned on classroom walls, making progress completely transparent to the entire cohort." }
    ]
  },
  {
    id: "X",
    dimension: "X-Factor",
    icon: "stakeholder",
    options: [
      { score: -1, color: "red", text: "Most of your student assignments are identical standard textbook/AI variants." },
      { score: 1, color: "yellow", text: "You always mention that there is extra credit for \"being creative\" or \"trying something unique\" on your assignment brief without defining what uniqueness means." },
      { score: 3, color: "green", text: "Your assessment rubric allocates 15% of the total score exclusively to the \"Differentiator Factor.\"" }
    ]
  },
  {
    id: "Y",
    dimension: "Yield Management",
    icon: "yield",
    options: [
      { score: -1, color: "red", text: "Students waste 10 hours customizing PowerPoint fonts and animations while their underlying math or code remains fundamentally broken." },
      { score: 1, color: "yellow", text: "You verbally warn students not to spend too much time on slide design before checking their core logic." },
      { score: 3, color: "green", text: "Your grading criteria penalize superficial cosmetic over-engineering if the underlying core functional model is weak." }
    ]
  },
  {
    id: "Z",
    dimension: "Zero-G Baseline",
    icon: "zero",
    options: [
      { score: -1, color: "red", text: "Students copy the exact design, structure, and parameters of a project done by an administrative batch 5 years ago." },
      { score: 1, color: "yellow", text: "You always change one/two variables or data fields from an old problem or case study to make it slightly distinct for students." },
      { score: 3, color: "green", text: "Your assignments are unique and original, where standard historical templates cannot be applied, forcing ‘first-principles’ thinking." }
    ]
  }
];

// Profile determination helper
function getTeachingProfile(score) {
  if (score > 60) {
    return {
      title: "The Entrepreneurial Educator facilitating a Transformative Learning Lab",
      range: ">60",
      description: "Congratulations, you are an entrepreneurial educator. Your classroom has successfully shifted from a traditional lecture hall to a high-velocity production studio. Your teaching style is decoupled from the classic podium-delivery (monologue), and you only track students’ real-world progress and always push them toward thinking uniquely. You are already running a functional bootcamp through your course.",
      wayForward: "You are incredibly close to a perfect green track. To take the final leap, look closely at any remaining Yellow blocks. Shifting just a few more elements from teacher-led to student-driven will cement your course as a gold-standard university bootcamp.",
      color: "#10b981",
      tier: "gold"
    };
  } else if (score >= 40) {
    return {
      title: "The Transitioning Launchpad",
      range: "40–60",
      description: "You have successfully broken the traditional teaching pattern. Your course design has strong foundational elements of action-bias, and you are using strategies like team clusters or basic practical goals. However, the ghost of legacy academic formatting still pulls you back-i.e, you are likely still spending significant energy on lectures and assessment.",
      wayForward: "You have done the hardest part: breaking the old rhythm. Your students are already getting a taste of learning-by-doing. To move up, focus on bootcamp-format course design. Let go of the 50-minute talk track by building tighter At-Home Prep for students, and activate an effective Peer Review System to take the heavy grading load off your shoulders.",
      color: "#f59e0b",
      tier: "silver"
    };
  } else {
    return {
      title: "The Spark Phase",
      range: "Below 40",
      description: "Your course layout currently relies on the classic, safe university architecture: heavy theory upfront, low peer collaboration, and evaluation based on paperwork rather than execution. The good news is that you have identified exactly where the friction lies. Even a score in this tier shows you have the awareness to change the track.",
      wayForward: "Do not be discouraged by a low initial baseline. Every great entrepreneurial educator starts with a traditional lecture. You don't need to turn your whole course green overnight. Pick just one/two changes to introduce every week, and you would be in the entrepreneurial teaching zone by the end of the semester—start next week itself by introducing a 14-minute visible countdown timer (In-Class Action) and a 1-page rough draft deadline (What They Build). Watch how the energy in your room changes instantly.",
      color: "#ef4444",
      tier: "bronze"
    };
  }
}

if (typeof module !== "undefined") {
  module.exports = {
    ETC_QUESTIONS,
    getTeachingProfile,
  };
}
