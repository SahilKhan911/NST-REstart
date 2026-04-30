export type ComparisonRow = {
  dimension: string;
  nst: string;
  others: string;
};

export const comparisonRows: ComparisonRow[] = [
  {
    dimension: "How they teach",
    nst: "You ship your first project in week 2 of first sem. Theory shows up when you need it — you build first, theory follows. No 'studying CS' here. Just building it.",
    others: "Industry-aligned curriculum with hands-on lab components and final-year capstone projects.",
  },
  {
    dimension: "What you actually learn",
    nst: "DSA, frontend, backend, OOPS, ML, deep learning, CV, NLP, OS, computer architecture. The stack people actually use at work — not 2014's.",
    others: "Comprehensive computer science syllabus with elective specializations including AI/ML.",
  },
  {
    dimension: "Who teaches you",
    nst: "Instructors who shipped at Goldman Sachs, Siemens, ISRO last year. One of the profs is an ICPC World Finalist. Friday masterclasses with Swiggy's AVP, PhonePe's Head of Engineering, that kind of lineup.",
    others: "Highly qualified faculty with PhD credentials and decades of teaching experience.",
  },
  {
    dimension: "Internships",
    nst: "Sem 7 is a full-time, paid internship at a real company — built into the curriculum. Razorpay, Sarvam AI, ISB, Allen Digital, Zoomcar, PhysicsWallah. Highest stipend: ₹1.25L/month.",
    others: "Robust placement cell with 100% placement assistance and dedicated pre-placement training.",
  },
  {
    dimension: "Outside class hours",
    nst: "ICPC bootcamps run by World Finalists. Six first-years into GSoC last cycle. Two on Linux LFX, $3K stipends. Hackathons happen monthly, not once a year.",
    others: "Vibrant student life with active technical clubs and an annual flagship hackathon.",
  },
  {
    dimension: "Going abroad",
    nst: "Tech immersions in Singapore, China, Estonia. Paid internships in Dubai and Abu Dhabi. HPAIR delegates at Harvard and Tokyo. Built in, not optional.",
    others: "International collaborations with global partner universities and exchange programs.",
  },
  {
    dimension: "After 4 years",
    nst: "Year 1: frontend. Year 2: full-stack + data. Year 3: ML or product. Year 4: a real job, a startup, or masters apps. The path is laid out.",
    others: "Strong placement record with reputed companies and graduate school admissions.",
  },
  {
    dimension: "How the course updates",
    nst: "The curriculum updates every cohort. First-years study slightly different stuff than second-years — because the seniors actually flagged what worked and what didn't.",
    others: "Continuously updated curriculum aligned with industry standards.",
  },
];

export type YearPlan = {
  year: number;
  title: string;
  tagline: string;
  learn: string[];
  projects: string[];
  beyond: { title: string; body: string }[];
  outcome: string;
};

export const yearPlans: YearPlan[] = [
  {
    year: 1,
    title: "Build",
    tagline: "Strengthen the foundations of core CS — and ship from week one.",
    learn: [
      "Data Structures & Algorithms",
      "Front-end Development",
      "Maths — Foundation & Advanced",
      "Fundamentals of AI",
    ],
    projects: [
      "Gen-AI powered CRM platform",
      "Social media analyser in Python",
      "Personal portfolio website",
      "Interactive games",
      "Dynamic social media feed",
    ],
    beyond: [
      { title: "International Immersion", body: "See how tech is changing the world." },
      { title: "Competitive Programming", body: "Fuel your inner champion through ICPC." },
      { title: "Open Source", body: "Pursue GSoC to create lasting impact." },
      { title: "Tech Hackathon", body: "Turn ideas into game-changing innovations." },
    ],
    outcome: "Skills aligned with Front-End Engineer roles.",
  },
  {
    year: 2,
    title: "Innovate",
    tagline: "Go full-stack. Pick up data, ML, and the engineering systems behind real products.",
    learn: [
      "Backend Engineering",
      "Advanced Programming / OOPS",
      "Maths (Calculus & Linear Algebra)",
      "CS Fundamentals",
      "Data & Visual Analytics",
      "Introduction to Machine Learning",
    ],
    projects: [
      "Last-mile delivery route optimisation",
      "News content recommendation app",
      "Social app with live posts",
      "Ethical hacking — find vulnerabilities",
      "Compete in ICPC and GSoC",
    ],
    beyond: [
      { title: "Product Hunt Challenge", body: "Build, launch and get reviewed by the world." },
      { title: "Freelancing Challenge", body: "Earn, learn and build your personal brand." },
      { title: "Big Tech Trek", body: "Step into the offices of tech giants." },
      { title: "Real Audience Products", body: "Ship features used by a wide audience." },
    ],
    outcome: "Industry-relevant skills for Full-Stack Developers and Data Analysts.",
  },
  {
    year: 3,
    title: "Achieve",
    tagline: "Build data-driven, complex systems that scale.",
    learn: [
      "Deep Learning",
      "Introduction to AI",
      "Modern Computer Architecture",
      "Operating Systems & Computer Vision",
      "Natural Language Processing",
      "TOC / Compilers / Cybersecurity (MOOC)",
    ],
    projects: [
      "Mega auction app",
      "Live-streaming app that scales",
      "Collaborative apps like Google Docs",
      "Understand and fix a computer network",
    ],
    beyond: [
      { title: "Development Projects", body: "Build, iterate, innovate — one breakthrough at a time." },
      { title: "Deep Tech Projects", body: "Innovate and build your profile for higher pursuits." },
      { title: "Product Launch Challenge", body: "Launch and validate your software & hardware ideas." },
    ],
    outcome: "Capable of advanced roles: ML Engineers, Data Engineers, Product Managers.",
  },
  {
    year: 4,
    title: "Succeed",
    tagline: "A full year for internships, research, and your own projects.",
    learn: [
      "1-Year Industry Internship",
      "Research & Higher Education prep",
      "Capstone & personal projects",
      "Startup incubation track",
    ],
    projects: [
      "Long-form internship deliverables",
      "Research papers & open-source contributions",
      "Startup MVPs with institute funding",
      "Master's & higher-ed prep",
    ],
    beyond: [
      { title: "Industry Internships", body: "Real-world projects, impactful career growth." },
      { title: "Deep Tech Projects", body: "Build a portfolio for top global pursuits." },
      { title: "Startup Incubation", body: "From idea to investment — raise capital while you study." },
    ],
    outcome: "Corporate tech jobs, funded startups, Master's eligibility, or research paths.",
  },
];

export const internshipStats: { value: string; label: string }[] = [
  { value: "93%+", label: "Internship placement rate by 2nd year" },
  { value: "₹1,25,000/m", label: "Highest stipend secured" },
  { value: "₹40,714", label: "Top 10% interns avg. monthly" },
  { value: "₹23,066", label: "Average earned monthly" },
];

export const internshipCompanies: string[] = [
  "Razorpay",
  "DRDO",
  "Zoomcar",
  "IIT Roorkee",
  "Sarvam AI",
  "Allen Digital",
  "University of Essex",
  "ISB",
  "Rocketium",
  "PhysicsWallah",
];

export const achievementCards: { title: string; body: string; tag: string }[] = [
  {
    tag: "Smart India Hackathon 2025",
    title: "National Winner — 1 of 271 from 68,766 teams",
    body: "Voice-based ticketing and real-time tracking solution for the Government of Punjab's public transport challenge.",
  },
  {
    tag: "ICPC Chennai Regionals 2025",
    title: "Rank 22, Top 50 in India",
    body: "Five NST teams qualified for Amritapuri & Chennai Regionals, advancing to ICPC Asia West Finals — one step from World Finals.",
  },
  {
    tag: "Google Summer of Code",
    title: "6 first-year students selected",
    body: "Average stipend ₹2.3 lakhs at Google's most prestigious open-source program.",
  },
  {
    tag: "Linux LFX Mentorship",
    title: "Two NST students, $3000 stipend",
    body: "Saumya Kumar and Agnik Mishra (NST 2024 batch) joined the Linux Foundation's mentorship program.",
  },
  {
    tag: "India AI Impact Festival 2025",
    title: "Smartly BEE — Industrial Innovation winner",
    body: "Himanshu Dubey's AI-powered voice intelligence platform won the AI Impact Creators category, awarded by Intel's MD.",
  },
  {
    tag: "NEC 2025 — IIT Bombay E-Cell",
    title: "Top 5 of 4,000+ teams nationwide",
    body: "NST team advanced through every elimination round at IIT Bombay's National Entrepreneurship Challenge finals.",
  },
];

export const facultyMembers: { name: string; role: string; org: string }[] = [
  { name: "Gaurav Gehlot", role: "Ex-Software Engineer", org: "Goldman Sachs" },
  { name: "Krushn Dayshmookh", role: "Ex-Software Engineer", org: "Siemens" },
  { name: "Gurpreet Singh", role: "Ex-Scientist", org: "ISRO" },
  { name: "Shreyas Malewar", role: "Data Scientist", org: "USC" },
  { name: "Deepak Gour", role: "ICPC World Finalist · Lead Instructor", org: "NST Pune" },
];

export const faqItems: { q: string; a: string }[] = [
  {
    q: "What exactly is the B.Tech program at NST Pune?",
    a: "A 4-year B.Tech in Computer Science & Engineering with an Artificial Intelligence and Machine Learning specialisation, awarded by Ajeenkya DY Patil University (UGC approved, A-grade NAAC accredited) and powered by Newton School of Technology's industry-led curriculum.",
  },
  {
    q: "How is NST's curriculum different from a typical CS degree?",
    a: "It's structured year-by-year as Build → Innovate → Achieve → Succeed. You ship projects from semester one, layer in full-stack, ML, deep learning and systems by year three, and dedicate the entire fourth year to a 1-year industry internship, research, or your own startup.",
  },
  {
    q: "Who actually teaches the courses?",
    a: "A blend of full-time industry faculty (engineers from Goldman Sachs, Siemens, ISRO, plus an ICPC World Finalist as Lead Instructor at NST Pune) and weekly masterclasses with leaders like Swiggy's AVP, PhonePe's Head of Engineering, and senior Apple/Google/OpenAI speakers.",
  },
  {
    q: "What are the actual internship outcomes?",
    a: "93%+ of students secure paid internships by their second year (certified by B2K Analytics, IIM Ahmedabad's placement auditors). Highest stipend recorded is ₹1,25,000/m. Average earned is ₹23,066/m, with the top 10% averaging ₹40,714/m. Hiring partners include Razorpay, Sarvam AI, Allen Digital, ISB, Zoomcar, PhysicsWallah, and DRDO.",
  },
  {
    q: "What about competitive programming and open source?",
    a: "Five NST teams qualified for ICPC Regionals 2025; one secured Rank 22 at Chennai and advanced to ICPC Asia West Finals. Six first-year students were selected for Google Summer of Code, and two joined the Linux Foundation's LFX Mentorship Program with a $3,000 stipend.",
  },
  {
    q: "Is the campus life any good?",
    a: "Honest answer — ask the students. That's exactly why we built the Restart WhatsApp group: hear it from people living it, not from a glossy brochure. Campus has modern classrooms, in-campus and out-of-campus hostels, mess + cafés, gym, sports facilities, and 24×7 security.",
  },
  {
    q: "What's the fee structure?",
    a: "Per semester: ₹1,56,250 tuition + ₹50,000 upskilling fees. Semester 1 also has a ₹50,000 seat block fee and ₹50,000 refundable caution deposit (so ₹3,06,250 in S1, ₹2,06,250 in every semester after). Hostel & mess starts at ₹1.1–1.2 lakhs per semester and is updated by 31st May 2026.",
  },
  {
    q: "How does the Q&A on this page work?",
    a: "Pick a category in the chat below, post your question and leave your email. A current NST student or counsellor replies — you get the answer by email, and the published Q&A also appears on the public chat so the next person with the same question doesn't have to ask twice.",
  },
];
