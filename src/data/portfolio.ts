export const portfolioData = {
  personal: {
    name: "Sohan Mandal",
    headline: "Building AI Systems, Data-Driven Products & Modern Web Applications",
    subheadline: "B.Tech CSE student at KIIT University with a strong interest in Artificial Intelligence, Data Architecture, and Cybersecurity. I enjoy building intelligent systems that combine AI, data, and software engineering to solve practical, real-world problems.",
    siteUrl: "https://sohan16.com",
    email: "sohanmandal1611@gmail.com",
    phone: "+91 9830322351",
    github: "https://github.com/sohan1611",
    linkedin: "https://www.linkedin.com/in/sohanm16",
    cgpa: "8.75",
    resumeUrl: "/resume/Sohan_Mandal_Resume.pdf",
    openToInternship: true,
  },
  highlights: [
    { title: "Education", value: "B.Tech CSE @ KIIT University" },
    { title: "Academic Standing", value: "CGPA: 8.75" },
    { title: "Focus Areas", value: "AI Systems & Data-Driven Applications" },
    { title: "Availability", value: "Open to Internship Opportunities" }
  ],
  about: {
    content: "I am a B.Tech Computer Science and Engineering student at KIIT University focused on Artificial Intelligence, Data Architecture, and Cybersecurity. I enjoy designing intelligent systems that combine AI, data, and software engineering to solve practical problems. Through projects like Apex Intel, SentinelIQ, and Reality Drift, I am building a strong foundation in creating scalable, data-driven applications while continuously expanding my knowledge of modern AI and software engineering."
  },
  education: [
    {
      institution: "KIIT University",
      degree: "B.Tech CSE",
      duration: "2024–2028",
      cgpa: "8.75"
    }
  ],
  skills: {
    programmingLanguages: ["Python", "TypeScript", "JavaScript", "Java", "C", "SQL"],
    frameworks: ["Next.js", "React", "FastAPI", "Express.js", "Tailwind CSS"],
    databases: ["PostgreSQL", "Supabase", "Neon", "pgvector", "Redis", "Prisma ORM", "SQLAlchemy"],
    ai: ["OpenAI API", "Gemini API", "Serper API", "Vector Embeddings", "Semantic Search"],
    auth: ["Google OAuth", "Resend"],
    cloud: ["Vercel", "Render", "Railway", "Cloudflare", "Google Cloud Run", "Upstash"],
    tools: ["Git", "GitHub", "GitHub Actions", "Docker"],
    aiDev: ["Claude Code", "OpenAI Codex", "AI-Augmented Engineering", "Rapid Prototyping", "Workflow Automation"],
    interests: ["Artificial Intelligence", "Data Architecture", "Cybersecurity", "AI-Assisted Full Stack Development"],
    currentlyLearning: ["Data Structures & Algorithms (DSA)", "Data Architecture", "Artificial Intelligence", "Generative AI", "Cybersecurity", "AI-Assisted Full Stack Development"]
  },
  futureGoals: [
    "Building practical AI applications",
    "Learning Data Architecture concepts and systems",
    "Strengthening Cybersecurity fundamentals",
    "Developing Full Stack Applications using AI-assisted development workflows",
    "Improving Data Structures & Algorithms problem-solving skills"
  ],
  projects: [
    {
      title: "Aspirova",
      problemStatement: "Student opportunities — internships, fellowships, research programmes and competitions — are scattered across hundreds of separate company career pages, so the ones that matter are easy to miss entirely.",
      solution: "Built an opportunity almanac that crawls company ATS endpoints daily and indexes every listing into one searchable platform, linking each application back to its original source.",
      keyFeatures: [
        "19,000+ opportunities indexed across 1,590+ companies",
        "Automated daily crawlers across 11 ATS sources",
        "Full-text and vector-based semantic search",
        "AI resume matching with no per-query LLM calls",
        "Human-verified recurring programmes and fellowships"
      ],
      technologies: ["Career Intelligence", "Vector Search", "Data Aggregation"],
      githubUrl: "https://github.com/sohan1611/Aspirova",
      liveUrl: "https://www.aspirova.org",
      status: "Live"
    },
    {
      title: "Apex Intel",
      problemStatement: "Startup due diligence requires extensive research across markets, competitors, risks, and business viability, making investment analysis time-consuming and fragmented.",
      solution: "Built an autonomous multi-agent platform that analyzes startups and generates structured investment memos for investors and analysts.",
      keyFeatures: [
        "Multi-agent startup evaluation",
        "Market and competitor analysis",
        "Risk assessment workflows",
        "Investment scoring engine",
        "Structured investment memo generation"
      ],
      technologies: ["Multi-Agent AI", "Due Diligence", "Investment Analysis"],
      githubUrl: "https://github.com/sohan1611/apex-intel",
      liveUrl: "https://apex-intel-nine.vercel.app",
      status: "In Progress"
    },
    {
      title: "SentinelIQ",
      problemStatement: "Analyzing public company filings and transcripts to detect inconsistencies and governance risks is a dense, fragmented, and time-consuming process.",
      solution: "Built an institutional-grade financial forensics engine that analyzes public data to detect potential fraud and governance risks.",
      keyFeatures: [
        "Institutional financial forensics",
        "Fraud and inconsistency detection",
        "Public filings and transcript analysis",
        "Analyst-style report generation",
        "Editorial and monospaced data visualization"
      ],
      technologies: ["Financial Forensics", "Risk Detection", "AI Analysis"],
      githubUrl: "https://github.com/sohan1611/SentinelIQ",
      liveUrl: null,
      status: "In Progress"
    },
    {
      title: "Reality Drift",
      problemStatement: "People often struggle to understand long-term behavioral patterns and the future impact of their daily habits.",
      solution: "Built an AI-powered life pattern simulator that analyzes habits and predicts future behavioral trends over a 30-day horizon.",
      keyFeatures: [
        "Habit tracking and analysis",
        "AI-powered future simulations",
        "Personalized coaching insights",
        "Behavioral trend prediction",
        "Interactive analytics dashboard"
      ],
      technologies: ["AI Simulation", "Behavior Analytics", "Habit Tracking"],
      githubUrl: "https://github.com/sohan1611/reality-drift",
      liveUrl: "https://frontend-rho-ten-59.vercel.app",
      status: "Active Development"
    }
  ],
  achievements: [
    {
      title: "Machine Learning & Agentic AI",
      issuer: "E&ICT Academy, IIT Roorkee",
      programType: "Summer Training & Internship Program",
      verificationUrl: "https://eict.iitr.ac.in/?certificate=verification",
      verificationNote: "Enter the certificate ID printed in the top-right corner of the certificate.",
      status: "Completed",
      certificateFile: "/certificates/eict-iitr-ml-agentic-ai-certificate.jpg",
      certificateWidth: 3509,
      certificateHeight: 2712,
      showViewButton: true,
      showDownloadButton: true,
    },
    {
      title: "Build with AI Certification",
      issuer: "GeeksforGeeks",
      status: "Completed",
      certificateFile: "/certificates/gfg-build-with-ai-certificate.pdf",
      showViewButton: true,
      showDownloadButton: true,
    },
  ]
};
