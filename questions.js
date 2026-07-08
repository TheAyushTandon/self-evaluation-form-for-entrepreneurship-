// =========================================================
// ETC Assessment Questions — 26 Dimensions (A–Z)
// =========================================================

const ETC_QUESTIONS = [
  {
    id: "A",
    dimension: "Active Learning",
    icon: "active",
    question:
      "I design learning activities that require students to apply concepts through hands-on experiences rather than passive listening.",
    recommendations: [
      "Incorporate problem-based learning (PBL) modules into at least one course.",
      "Replace one lecture session per week with a workshop or case-study activity.",
      "Use flipped classroom techniques so students engage with material before class.",
    ],
  },
  {
    id: "B",
    dimension: "Brainstorming & Ideation",
    icon: "brainstorm",
    question:
      "I create structured brainstorming sessions that encourage students to generate and evaluate novel ideas without premature judgment.",
    recommendations: [
      "Run a weekly 15-minute 'crazy idea' warm-up before lectures.",
      "Introduce SCAMPER or mind-mapping frameworks to guide ideation.",
      "Use anonymous digital tools (e.g., Mentimeter) to lower the barrier for sharing ideas.",
    ],
  },
  {
    id: "C",
    dimension: "Collaboration & Teamwork",
    icon: "collab",
    question:
      "I assign meaningful team projects that mirror real-world cross-functional collaboration, including defined roles and shared accountability.",
    recommendations: [
      "Define clear individual roles within every group project.",
      "Require a team charter document at the start of each collaborative assignment.",
      "Include a peer-evaluation component in group project grading.",
    ],
  },
  {
    id: "D",
    dimension: "Design Thinking",
    icon: "design",
    question:
      "I embed human-centered design principles — empathy, define, ideate, prototype, test — into course assignments or curriculum.",
    recommendations: [
      "Introduce empathy mapping activities using real user interviews.",
      "Encourage rapid prototyping workshops with physical or digital materials.",
      "Include a testing and feedback loop in at least one major project.",
    ],
  },
  {
    id: "E",
    dimension: "Experiential Learning",
    icon: "learning",
    question:
      "I connect course content to real-world experiences through internships, field visits, live projects, or industry collaborations.",
    recommendations: [
      "Partner with at least one local business or startup for a semester-long live project.",
      "Organize industry site visits aligned with course topics.",
      "Invite practitioners to co-teach sessions relevant to your subject.",
    ],
  },
  {
    id: "F",
    dimension: "Failure Tolerance & Resilience",
    icon: "failure",
    question:
      "I actively celebrate learning from failure, creating a classroom culture where productive mistakes are seen as growth opportunities.",
    recommendations: [
      "Share case studies of famous failures that led to breakthroughs.",
      "Create a 'Failure Report' assignment where students document and learn from a setback.",
      "Remove heavy penalties for first attempts and incentivize iteration.",
    ],
  },
  {
    id: "G",
    dimension: "Growth Mindset Cultivation",
    icon: "growth",
    question:
      "I consistently model and reinforce growth mindset language, framing challenges as opportunities rather than fixed limitations.",
    recommendations: [
      "Use 'not yet' language instead of final grades on formative work.",
      "Assign Carol Dweck readings and facilitate structured reflection discussions.",
      "Design assessments that reward effort, strategy, and progress alongside outcomes.",
    ],
  },
  {
    id: "H",
    dimension: "Human-Centered Empathy",
    icon: "empathy",
    question:
      "I encourage students to deeply understand the needs, motivations, and pain points of the end-users or stakeholders their work is meant to serve.",
    recommendations: [
      "Require user interviews as part of every major project brief.",
      "Introduce journey mapping tools to visualize user experiences.",
      "Have students present solutions from the user's perspective, not their own.",
    ],
  },
  {
    id: "I",
    dimension: "Innovation & Creativity",
    icon: "innovation",
    question:
      "I challenge students to move beyond conventional solutions and explore novel, disruptive, or unconventional approaches to problems.",
    recommendations: [
      "Assign 'Blue Ocean' strategy exercises that force non-conventional thinking.",
      "Introduce creative constraints (e.g., 'Solve this problem with no budget').",
      "Reward the most original solution, not just the most technically correct one.",
    ],
  },
  {
    id: "J",
    dimension: "Just-in-Time Learning",
    icon: "time",
    question:
      "I deliver knowledge and skills at the moment students need them to solve a real problem, rather than front-loading all theory before application.",
    recommendations: [
      "Redesign at least one module to deliver theory only as students encounter a need for it.",
      "Use project milestones as triggers for introducing new conceptual content.",
      "Provide curated micro-learning resources students can access on-demand.",
    ],
  },
  {
    id: "K",
    dimension: "Knowledge Transfer & Application",
    icon: "transfer",
    question:
      "I design assessments that require students to transfer and apply knowledge across contexts, not merely recall information.",
    recommendations: [
      "Replace rote recall exams with case-analysis or scenario-based assessments.",
      "Include a 'real-world application' section in every assessment.",
      "Use transfer tasks that require applying one discipline's concepts to another.",
    ],
  },
  {
    id: "L",
    dimension: "Leadership Development",
    icon: "leadership",
    question:
      "I provide students with structured leadership opportunities, including owning decisions, managing peers, and communicating vision.",
    recommendations: [
      "Rotate team leadership roles on a weekly or per-project basis.",
      "Debrief leadership decisions as a class to build reflective leadership skills.",
      "Assign leadership case studies with guided reflection prompts.",
    ],
  },
  {
    id: "M",
    dimension: "Mentoring & Coaching",
    icon: "mentoring",
    question:
      "I proactively mentor students beyond their academic performance, guiding their professional development, mindset, and long-term goals.",
    recommendations: [
      "Schedule one-on-one mentoring check-ins at least once per semester.",
      "Maintain a 'student growth journal' tracking individual student development.",
      "Connect high-potential students with industry mentors or alumni.",
    ],
  },
  {
    id: "N",
    dimension: "Networking & Relationship Building",
    icon: "networking",
    question:
      "I actively help students build professional networks by creating structured opportunities to connect with industry experts, alumni, and peers.",
    recommendations: [
      "Invite alumni speakers to at least two sessions per semester.",
      "Organize industry networking sessions or career connect events.",
      "Assign a LinkedIn outreach project requiring students to conduct informational interviews.",
    ],
  },
  {
    id: "O",
    dimension: "Opportunity Recognition",
    icon: "opportunity",
    question:
      "I train students to systematically identify unmet needs, market gaps, and opportunities for value creation in real environments.",
    recommendations: [
      "Assign a 'problem scoping' project where students interview 10 potential users.",
      "Teach opportunity evaluation frameworks (e.g., Jobs-to-be-Done, Opportunity Canvas).",
      "Have students track and pitch one real-world opportunity per month.",
    ],
  },
  {
    id: "P",
    dimension: "Problem Solving & Critical Thinking",
    icon: "problem",
    question:
      "I structure course challenges to require multi-step, ambiguous problem-solving that demands both analytical and creative thinking.",
    recommendations: [
      "Use ill-structured problem sets that have no single correct answer.",
      "Teach structured problem-solving frameworks (e.g., Root Cause Analysis, Five Whys).",
      "Include devil's advocate exercises where students argue against their own solutions.",
    ],
  },
  {
    id: "Q",
    dimension: "Quality & Continuous Improvement",
    icon: "quality",
    question:
      "I instill a culture of continuous improvement, where students iteratively refine their work based on feedback rather than submitting once and moving on.",
    recommendations: [
      "Require at least one revision cycle on major submissions using peer or instructor feedback.",
      "Introduce kaizen principles and iterative sprint-based project cycles.",
      "Create a public 'portfolio of improvements' where students track their version history.",
    ],
  },
  {
    id: "R",
    dimension: "Risk Assessment & Management",
    icon: "risk",
    question:
      "I help students understand, quantify, and intelligently manage risk — balancing caution with the entrepreneurial imperative to act under uncertainty.",
    recommendations: [
      "Assign risk matrices as part of every business or project plan submission.",
      "Simulate decision-making under uncertainty using business simulations or role-plays.",
      "Teach students to distinguish between reckless risk and calculated risk-taking.",
    ],
  },
  {
    id: "S",
    dimension: "Stakeholder Engagement",
    icon: "stakeholder",
    question:
      "I require students to engage real stakeholders — customers, investors, partners, or communities — in their projects beyond the classroom.",
    recommendations: [
      "Require a stakeholder map and communication plan in every major project.",
      "Organize a 'Pitch Day' where students present to real external stakeholders.",
      "Include user testing sessions with real people as a graded project component.",
    ],
  },
  {
    id: "T",
    dimension: "Technology Integration",
    icon: "tech",
    question:
      "I actively integrate emerging technologies — AI, digital collaboration tools, data platforms — into my teaching methodology and student projects.",
    recommendations: [
      "Explore AI-assisted teaching tools such as ChatGPT, Copilot, or Gemini for class activities.",
      "Use collaborative digital platforms (Miro, Notion, Figma) for group projects.",
      "Introduce students to data analysis tools relevant to their field.",
    ],
  },
  {
    id: "U",
    dimension: "Uncertainty & Ambiguity Management",
    icon: "uncertainty",
    question:
      "I intentionally create exercises where students must navigate incomplete information, make decisions, and adapt — preparing them for real-world uncertainty.",
    recommendations: [
      "Design case studies with deliberately incomplete information sets.",
      "Facilitate 'pivot exercises' where the problem brief changes midway through a project.",
      "Debrief uncertainty-navigation strategies as a reflective class practice.",
    ],
  },
  {
    id: "V",
    dimension: "Value Creation & Impact",
    icon: "value",
    question:
      "I measure student success not only by academic performance, but also by the tangible value — social, economic, or environmental — their work creates.",
    recommendations: [
      "Add a 'Value Created' section to every project rubric.",
      "Require students to estimate and articulate the impact of their proposed solution.",
      "Celebrate projects that created measurable real-world impact with institutional recognition.",
    ],
  },
  {
    id: "W",
    dimension: "Workplace & Career Readiness",
    icon: "career",
    question:
      "I intentionally build workplace-ready skills — communication, adaptability, professional presence, and self-management — into my course design.",
    recommendations: [
      "Include a formal presentation component in at least one assessment per semester.",
      "Facilitate mock interview or professional communication workshops.",
      "Embed reflection exercises that connect course learning to professional competencies.",
    ],
  },
  {
    id: "X",
    dimension: "Cross-disciplinary Thinking",
    icon: "cross",
    question:
      "I encourage students to draw insights from fields outside their primary discipline and apply them creatively to problems in their domain.",
    recommendations: [
      "Assign readings or case studies from adjacent disciplines.",
      "Create cross-departmental projects or invite guest lecturers from other fields.",
      "Use analogical thinking exercises to transfer solutions from one domain to another.",
    ],
  },
  {
    id: "Y",
    dimension: "Yield & Outcomes Orientation",
    icon: "yield",
    question:
      "I design my course around tangible, measurable outcomes that students can demonstrate and showcase beyond the classroom.",
    recommendations: [
      "Design every course around a capstone deliverable that students can add to their portfolio.",
      "Map every learning activity to a clear, demonstrable competency.",
      "Use outcome-based rubrics that prioritize demonstrated capability over subjective quality.",
    ],
  },
  {
    id: "Z",
    dimension: "Zero-to-One Thinking",
    icon: "zero",
    question:
      "I inspire students to pursue breakthrough, first-of-its-kind thinking — moving from zero to something that has never existed before.",
    recommendations: [
      "Assign a 'Create something the world doesn't have yet' challenge each semester.",
      "Teach students to identify 'white space' opportunities in markets and communities.",
      "Celebrate originality and first-mover thinking in grading and public recognition.",
    ],
  },
];

// Score mapping
const SCORE_MAP = {
  "Consistently Practice": 3,
  "Occasionally Practice": 1,
  "Opportunity for Growth": -1,
};

// Removed score/emoji indicators from OPTIONS representation
const RESPONSE_OPTIONS = [
  {
    label: "Consistently Practice",
    score: 3,
    description: "This is a regular part of my teaching approach",
  },
  {
    label: "Occasionally Practice",
    score: 1,
    description: "I do this sometimes but not consistently",
  },
  {
    label: "Opportunity for Growth",
    score: -1,
    description: "This is an area I'm looking to develop",
  },
];

// Profile determination
function getTeachingProfile(score) {
  if (score >= 65) {
    return {
      title: "Innovation Champion",
      range: "65–78",
      description:
        "You demonstrate excellent entrepreneurial teaching practices with consistent innovation across multiple dimensions. Your students benefit immensely from an educator who is actively shaping the future of learning.",
      color: "#10b981",
      badge: "",
      tier: "gold",
    };
  } else if (score >= 40) {
    return {
      title: "Growth-Oriented Educator",
      range: "40–64",
      description:
        "You have a strong teaching foundation with clear opportunities to expand entrepreneurial learning experiences. With intentional focus, you will achieve even greater impact.",
      color: "#10b981",
      badge: "",
      tier: "silver",
    };
  } else {
    return {
      title: "Emerging Entrepreneurial Practitioner",
      range: "Below 40",
      description:
        "This is an excellent starting point for continued professional development. Every expert was once a beginner — your willingness to reflect honestly demonstrates a strong growth mindset.",
      color: "#10b981",
      badge: "",
      tier: "bronze",
    };
  }
}

// Export for use in app
if (typeof module !== "undefined") {
  module.exports = {
    ETC_QUESTIONS,
    SCORE_MAP,
    RESPONSE_OPTIONS,
    getTeachingProfile,
  };
}
