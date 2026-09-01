/* ==========================================================================
   PORTFOLIO CONFIGURATION DATA — SEERAMREDDI PRAVEEN
   Centralized data source for content, projects, skills, timeline & socials.
   ========================================================================== */

const PORTFOLIO_DATA = {
  personal: {
    name: "SEERAMREDDI PRAVEEN",
    shortName: "S. PRAVEEN",
    role: "CS Student & Creative Developer",
    headline: "I BUILD DIGITAL EXPERIENCES.",
    subheadline: "Designer. Developer. Problem solver.",
    statusText: "AVAILABLE FOR ROLES",
    location: "Visakhapatnam, India",
    timeZone: "Asia/Kolkata",
    resumeUrl: "assets/Praveen_Resume.pdf",
    descriptors: ["BUILDING", "DESIGNING", "EXPERIMENTING", "CREATING"],
  },

  commandCenter: {
    systemStatus: "Available for Projects",
    currentlyBuilding: "Aura Editorial Platform v2.0",
    currentFocus: "Frontend Systems & Creative UX",
    selectedTech: "React • Next.js • TypeScript • Python",
    availability: "Open for Roles & Freelance",
    latestProject: "Vortex Audio Visualizer",
    coordinates: "Visakhapatnam, India",
  },

  about: {
    largeStatement: "I LIKE TURNING COMPLEX IDEAS INTO SIMPLE EXPERIENCES.",
    bioParagraph1: "I am Seeramreddi Praveen, a Computer Science student driven by clean code, intuitive interfaces, and high-performance digital experiences.",
    bioParagraph2: "I specialize in frontend engineering, interactive web applications, and modern software design. My approach combines technical precision with intentional typography, dark visual systems, and motion.",
    metadata: [
      { label: "ROLE", value: "CS Student & Creative Developer" },
      { label: "FOCUS", value: "Frontend Systems & Interactive UX" },
      { label: "BASED IN", value: "India (Available Globally / Remote)" },
      { label: "CURRENTLY LEARNING", value: "WebGL / GPU Shaders / Rust" }
    ]
  },

  currently: {
    sectionTitle: "CURRENTLY",
    subtitle: "LIVE STATUS BOARD",
    items: [
      { label: "BUILDING", value: "Digital Control Room Portfolio v2.0 with interactive canvas & WebGL visualizers." },
      { label: "LEARNING", value: "Advanced shader graphics, GLSL mathematical animation, and GPU acceleration." },
      { label: "EXPLORING", value: "AI agent integrations, autonomous developer tools, and edge runtime architecture." }
    ]
  },

  skills: [
    {
      category: "DEVELOPMENT",
      items: [
        { name: "C", desc: "Low-level system fundamentals, pointers & memory management." },
        { name: "Python", desc: "Backend scripts, data structures, automation & AI workflows." },
        { name: "JavaScript", desc: "Modern ES6+, async architecture & client-side engines." },
        { name: "TypeScript", desc: "Type-safe scalable application development & interfaces." },
        { name: "HTML5", desc: "Semantic structure, web accessibility (a11y) & SEO standards." },
        { name: "CSS3", desc: "Custom animations, grid layouts, flexbox & design tokens." }
      ]
    },
    {
      category: "DESIGN",
      items: [
        { name: "UI/UX", desc: "User-centric design systems, component libraries & wireframes." },
        { name: "Figma", desc: "Design tokens, auto-layout, interactive prototypes & UI kits." },
        { name: "3D / CAD", desc: "Spatial concept modeling, asset optimization & vector graphics." }
      ]
    },
    {
      category: "TECHNOLOGY",
      items: [
        { name: "AI", desc: "LLM API integration, prompt engineering & agent workflows." },
        { name: "Automation", desc: "Workflow optimization, script runners & automated pipelines." },
        { name: "Git", desc: "Branching strategies, version control & GitHub Actions." },
        { name: "APIs", desc: "RESTful architecture, JSON APIs & async data fetching." }
      ]
    }
  ],

  projects: [
    {
      id: "aura-editorial",
      number: "01",
      title: "AURA EDITORIAL PLATFORM",
      description: "High-performance digital publication platform with dynamic typography scaling and zero layout shift.",
      category: "Next.js / TypeScript / Web",
      year: "2026",
      featured: true,
      technologies: ["NEXT.JS", "TYPESCRIPT", "TAILWIND", "SUPABASE"],
      liveUrl: "https://github.com/seeramreddipraveen",
      githubUrl: "https://github.com/seeramreddipraveen",
      accentColor: "#A855F7",
      caseStudy: {
        overview: "Aura is an editorial web platform engineered for extreme performance, fluid reader typography, and real-time content authoring.",
        problem: "Traditional CMS platforms suffer from heavy layout shifts, bloated JavaScript bundles, and rigid template constraints that degrade reading experiences.",
        solution: "Engineered a Next.js server-rendered application featuring static page pre-generation, fluid typographic scale math, and real-time database syncing.",
        process: [
          "Benchmarked typographic legibility across desktop and mobile screens.",
          "Architected modular content blocks using TypeScript interfaces.",
          "Optimized bundle size and CSS delivery to achieve sub-100ms page transitions.",
          "Integrated automated database webhooks for instant publisher updates."
        ],
        results: "Achieved a 99+ Lighthouse performance score, zero Cumulative Layout Shift (CLS), and sub-100ms initial load times.",
        metrics: [
          { label: "LIGHTHOUSE SCORE", value: "99/100" },
          { label: "LAYOUT SHIFT (CLS)", value: "0.00" },
          { label: "PAGE TRANSITION", value: "<100ms" }
        ]
      }
    },
    {
      id: "kinetic-dashboard",
      number: "02",
      title: "KINETIC DATA DASHBOARD",
      description: "Real-time telemetry dashboard featuring high-frequency canvas rendering and interactive stream charts.",
      category: "React / D3.js / WebGL",
      year: "2026",
      featured: false,
      technologies: ["REACT", "D3.JS", "WEBGL", "NODE.JS"],
      liveUrl: "https://github.com/seeramreddipraveen",
      githubUrl: "https://github.com/seeramreddipraveen",
      accentColor: "#38BDF8",
      caseStudy: {
        overview: "Kinetic is a real-time analytics visualizer capable of rendering high-density data streams at 60 FPS without main thread locking.",
        problem: "Standard DOM-based charting packages crash or freeze when rendering over 50,000 live data points concurrently.",
        solution: "Built a hybrid Canvas/WebGL chart pipeline utilizing Web Workers for off-thread mathematical calculations and frame buffer interpolation.",
        process: [
          "Evaluated DOM vs SVG vs Canvas vs WebGL rendering performance under high loads.",
          "Offloaded telemetry calculations to Web Workers.",
          "Designed custom color maps optimized for high-contrast dark environments."
        ],
        results: "Sustained fluid 60 FPS rendering under throughput of 100,000 points per second.",
        metrics: [
          { label: "TARGET FRAME RATE", value: "60 FPS" },
          { label: "MAX DATA POINTS", value: "100,000+" },
          { label: "CPU LATENCY", value: "<2.4ms" }
        ]
      }
    },
    {
      id: "vortex-audio",
      number: "03",
      title: "VORTEX AUDIO VISUALIZER",
      description: "Interactive WebAudio application rendering microphone and track frequency spectra into 3D particle waves.",
      category: "WebGL / JavaScript / WebAudio",
      year: "2025",
      featured: false,
      technologies: ["WEBGL", "JAVASCRIPT", "WEBAUDIO", "CANVAS"],
      liveUrl: "https://github.com/seeramreddipraveen",
      githubUrl: "https://github.com/seeramreddipraveen",
      accentColor: "#C8F135",
      caseStudy: {
        overview: "Vortex captures live audio frequency bins to construct interactive 3D particle wave visualizers in real time.",
        problem: "Raw Fast Fourier Transform (FFT) data produces harsh, erratic animations if unrefined.",
        solution: "Engineered an exponential smoothing layer and custom WebGL particle shaders mapping acoustic amplitude directly to node velocity.",
        process: [
          "Captured audio input streams using the WebAudio AnalyserNode API.",
          "Applied logarithmic frequency bin grouping matching human auditory response.",
          "Implemented GPU particle instancing for smooth particle dispersion."
        ],
        results: "Delivered a low-latency, highly immersive visualizer praised for visual elegance.",
        metrics: [
          { label: "AUDIO LATENCY", value: "<12ms" },
          { label: "PARTICLE COUNT", value: "25,000" },
          { label: "FFT BINS", value: "1024 Bins" }
        ]
      }
    },
    {
      id: "cyber-terminal",
      number: "04",
      title: "CYBER TERMINAL TOOLKIT",
      description: "Developer CLI suite for automated environment configuration, project scaffolding, and system telemetry.",
      category: "Python / Automation / CLI",
      year: "2025",
      featured: false,
      technologies: ["PYTHON", "CLI", "SYSTEM", "GIT"],
      liveUrl: "https://github.com/seeramreddipraveen",
      githubUrl: "https://github.com/seeramreddipraveen",
      accentColor: "#F43F5E",
      caseStudy: {
        overview: "Cyber Terminal is a cross-platform CLI tool created to automate environment setup, project template generation, and Git workflows.",
        problem: "Setting up repetitive dev environments manually across machines consumes valuable engineering time.",
        solution: "Created a modular Python CLI with interactive prompts, automated dependency resolution, and colorized terminal reports.",
        process: [
          "Structured command hierarchy with argparse and custom styling.",
          "Built asynchronous subprocess runners with active progress spinners.",
          "Added self-healing configuration backup and restore commands."
        ],
        results: "Reduced project initialization setup time from 25 minutes to under 2 minutes.",
        metrics: [
          { label: "SETUP TIME REDUCTION", value: "92%" },
          { label: "PLATFORM SUPPORT", value: "Win/Mac/Linux" },
          { label: "COMMAND EXEC", value: "<0.4s" }
        ]
      }
    }
  ],

  timeline: [
    {
      year: "2026",
      role: "Lead Developer & CS Scholar",
      organization: "Computer Science Studies",
      description: "Spearheading advanced web application architecture, creative developer experiments, and modern frontend system design.",
      technologies: ["React", "TypeScript", "Python", "Next.js"]
    },
    {
      year: "2025",
      role: "Frontend Engineer & Designer",
      organization: "Academic & Personal Projects",
      description: "Engineered interactive web applications, high-performance dashboards, dynamic UI components, and Figma design systems.",
      technologies: ["JavaScript (ES6+)", "CSS3", "HTML5", "Figma"]
    },
    {
      year: "2024",
      role: "Computer Science Foundation",
      organization: "University Studies",
      description: "Focused on core programming principles, data structures, algorithms, low-level memory concepts, and object-oriented programming.",
      technologies: ["C", "Python", "Data Structures", "Algorithms"]
    }
  ],

  socials: {
    github: "https://github.com/seeramreddipraveen",
    linkedin: "https://linkedin.com/in/seeramreddipraveen",
    email: "seeramreddipraveen@gmail.com",
    twitter: "https://x.com"
  }
};
