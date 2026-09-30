export const experiences = [
  {
    slug: "st-engineering",
    logo: "/assets/logos/st-engineering.png",
    company: "ST Engineering",
    role: "Software Engineer",
    period: "Sep 2025 — Present",
    field: "Platforms & infrastructure",
    summary:
      "Making complex applications easier to build, integrate, and deploy.",
    context:
      "Attached to The Digital and Intelligence Service, developing reusable application tooling and deployment infrastructure.",
    color: "blue",
    metrics: [
      { value: "6", label: "use cases adopted" },
      { value: "Days → hours", label: "integration effort" },
    ],
    skills: [
      "Python",
      "Dash",
      "Kafka",
      "PostgreSQL",
      "OpenShift",
      "Helm",
      "Argo CD",
    ],
    contributions: [
      {
        title: "A reusable application foundation",
        text: "Developed a low-code web application builder in Dash that lets non-technical teams dynamically generate custom forms and data visualisations from JSON/YAML configuration. Adopted across six use cases without writing new application code.",
      },
      {
        title: "Integrations through configuration",
        text: "Designed configurable Kafka and PostgreSQL integrations so new services can connect to event-driven messaging and persistent storage through configuration alone, reducing integration effort for each new use case from days to hours.",
      },
      {
        title: "Repeatable deployment",
        text: "Automated deployment across multiple OpenShift staging environments using Helm charts and Argo CD GitOps, replacing a manual, multi-step setup with a single repeatable process.",
      },
    ],
    images: [],
  },
  {
    slug: "dso",
    logo: "/assets/logos/dso.png",
    company: "DSO National Laboratories",
    role: "Machine Learning Engineer Intern",
    period: "Jul 2024 — Dec 2024",
    field: "Applied machine learning",
    summary:
      "Teaching a team of agents to work together through reinforcement learning.",
    context:
      "Designed and implemented a hierarchical reinforcement learning system for a simulated multi-agent environment.",
    color: "purple",
    metrics: [
      { value: "12", label: "coordinated agents" },
      { value: "95+%", label: "task success rate" },
    ],
    skills: ["Python", "PyTorch", "Hierarchical RL", "Multi-agent systems"],
    contributions: [
      {
        title: "Coordinating multiple agents",
        text: "Designed and implemented a hierarchical reinforcement learning system in PyTorch for coordinating 12 agents in a simulated multi-agent environment.",
      },
      {
        title: "Refining the learning environment",
        text: "Tuned the state, observation, and reward configurations for the system, improving task success rate to over 95%.",
      },
    ],
    images: [
      {
        src: "DSO-prawning.jpg",
        alt: "Team outing during my DSO internship",
        caption: "Outside the lab · A team outing at DSO",
      },
    ],
  },
  {
    slug: "continental",
    logo: "/assets/logos/continental.png",
    company: "Continental Automotive",
    role: "Software Engineer Intern",
    period: "Jul 2023 — Dec 2023",
    field: "Robotics & connected systems",
    summary:
      "Connecting autonomous robots, from fleet dashboard to live delivery.",
    context:
      "Led development of a fleet management system for autonomous food delivery robots at Continental Automotive Singapore.",
    color: "orange",
    metrics: [
      { value: "3", label: "robots operating concurrently" },
      { value: "6", label: "delivery waypoints" },
    ],
    skills: ["Python", "FastAPI", "ROS2", "OpenRMF"],
    contributions: [
      {
        title: "Real-time fleet visibility",
        text: "Led development of a fleet management system using FastAPI, ROS2, and OpenRMF, including a real-time dashboard tracking robot battery levels, task states, and locations.",
      },
      {
        title: "From development to live delivery",
        text: "Deployed the system to a fleet of three robots operating concurrently along a six-waypoint delivery route, demonstrating live deliveries to key stakeholders.",
      },
    ],
    images: [
      {
        src: "conti_group.jpeg",
        alt: "Shannen with colleagues at Continental",
        caption: "The people behind the project · Continental",
      },
      {
        src: "Conti_solo.jpeg",
        alt: "Shannen during her Continental internship",
        caption: "On site · Continental Automotive Singapore",
      },
    ],
  },
  {
    slug: "amaris-ai",
    logo: "/assets/logos/amaris-ai.png",
    company: "AMARIS.AI",
    role: "Software Developer Intern",
    period: "Jul 2022 — Dec 2022",
    field: "Full-stack product development",
    summary:
      "Building a more reliable AI-powered paint visualisation experience.",
    context:
      "Worked across React interfaces and FastAPI backend features for a paint-visualisation platform serving customers across APAC.",
    color: "green",
    metrics: [
      { value: "8", label: "APAC countries served" },
      { value: "70+", label: "backend tests" },
    ],
    skills: ["React", "FastAPI", "Python", "JavaScript", "Backend testing"],
    contributions: [
      {
        title: "Reusable, multilingual interfaces",
        text: "Built reusable, multilingual React components and extended FastAPI backend features for an AI-powered paint-visualisation platform used by customers across eight APAC countries.",
      },
      {
        title: "Reliability across the product",
        text: "Resolved more than 30 bugs across photo processing, billing, and report downloads. Built a backend suite of over 70 tests to catch regressions before release and improve platform reliability for production users.",
      },
    ],
    images: [],
    recommendation: "/assets/images/Testimonial%20Amaris%20AI.pdf",
  },
];
