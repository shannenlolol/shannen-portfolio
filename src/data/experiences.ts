export const experiences = [
  {
    slug: "st-engineering",
    logo: "/assets/logos/st-engineering.png",
    company: "ST Engineering",
    attachedTo: { name: "The Digital and Intelligence Service", logo: "/assets/logos/dis.png" },
    role: "Software Engineer",
    period: "Sep 2025 - Present",
    field: "Platforms & infrastructure",
    context:
      "Attached to The Digital and Intelligence Service, developing reusable application tooling and deployment infrastructure.",
    color: "blue",
    headline: { value: "Days → hours", label: "to connect each new service" },
    // proud: "[Proudest moment: one sentence]",
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
        text: "A low-code Dash builder that turns JSON/YAML config into forms and charts for non-technical teams. Adopted across six use cases with no new code.",
      },
      {
        title: "Integrations through configuration",
        text: "Kafka and PostgreSQL integrations set up through config alone, cutting the effort for each new use case from days to hours.",
      },
      {
        title: "Repeatable deployment",
        text: "Helm and Argo CD GitOps deploys across OpenShift staging, replacing a manual multi-step setup with one repeatable process.",
      },
    ],
    // Unlike the other roles, these keep their captions: they explain the photographer role.
    images: [
      {
        src: "experience/st-engineering/airshow-2026-photographers-1.jpg",
        alt: "Shannen and a fellow photographer holding up their cameras at the ST Engineering booth",
        caption: "Event photographer at Singapore Airshow 2026",
      },
      {
        src: "experience/st-engineering/cny-dinner-2026.jpg",
        alt: "Shannen with colleagues dressed in red at a Chinese New Year dinner",
        caption: "Chinese New Year dinner, 2026",
        uncropped: true,
      },
      {
        src: "experience/st-engineering/mss-40th-anniversary.jpg",
        alt: "Mission Software & Services team photo in front of the 40th anniversary screen",
        caption: "Mission Software & Services turns 40",
        uncropped: true,
      },
    ],
  },
  {
    slug: "dso",
    logo: "/assets/logos/dso.png",
    company: "DSO National Laboratories",
    role: "Machine Learning Engineer Intern",
    period: "Jul 2024 - Dec 2024",
    field: "Applied machine learning",
    context:
      "Designed and implemented a hierarchical reinforcement learning system for a simulated multi-agent environment.",
    color: "purple",
    headline: { value: "12 agents", label: "working as a team, with 95%+ task success" },
    // proud: "[Proudest moment: one sentence]",
    metrics: [
      { value: "12", label: "coordinated agents" },
      { value: "95+%", label: "task success rate" },
    ],
    skills: ["Python", "PyTorch", "Hierarchical RL", "Multi-agent systems"],
    contributions: [
      {
        title: "Coordinating multiple agents",
        text: "A hierarchical reinforcement learning system in PyTorch that coordinates 12 agents in a simulated environment.",
      },
      {
        title: "Refining the learning environment",
        text: "Tuned the state, observation and reward design, lifting the task success rate above 95%.",
      },
    ],
    images: [
      {
        src: "experience/dso/team-outing-prawning.jpg",
        alt: "Team outing during my DSO internship",
        // caption: "Outside the lab · A team outing at DSO",
      },
      {
        src: "experience/dso/linkedin-video-thumbnail.jpg",
        alt: "Shannen waving hello outside DSO National Laboratories, introduced as an intern in the Information Division",
        caption: "Featured in a DSO video",
        video: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7275813594418528256?compact=1",
      },
    ],
  },
  {
    slug: "continental",
    logo: "/assets/logos/continental.png",
    company: "Continental Automotive",
    role: "Software Engineer Intern",
    period: "Jul 2023 - Dec 2023",
    field: "Robotics & connected systems",
    context:
      "Led development of a fleet management system for autonomous food delivery robots at Continental Automotive Singapore.",
    color: "orange",
    headline: { value: "3 robots", label: "running live deliveries across 6 waypoints" },
    // proud: "[Proudest moment: one sentence]",
    metrics: [
      { value: "3", label: "robots operating concurrently" },
      { value: "6", label: "delivery waypoints" },
    ],
    skills: ["Python", "FastAPI", "ROS2", "OpenRMF"],
    contributions: [
      {
        title: "Real-time fleet visibility",
        text: "Led a fleet management system on FastAPI, ROS2 and OpenRMF, with a live dashboard of each robot's battery, task and location.",
      },
      {
        title: "From development to live delivery",
        text: "Deployed it to three robots running a six-waypoint delivery route at once, with live demos for key stakeholders.",
      },
    ],
    images: [
      {
        src: "experience/continental/intern-cohort.jpg",
        alt: "Shannen with colleagues at Continental",
        // caption: "The people behind the project · Continental",
      },
      {
        src: "experience/continental/office-lobby.jpg",
        alt: "Shannen during her Continental internship",
        // caption: "On site · Continental Automotive Singapore",
      },
    ],
  },
  {
    slug: "amaris-ai",
    logo: "/assets/logos/amaris-ai.png",
    company: "AMARIS.AI",
    role: "Software Developer Intern",
    period: "Jul 2022 - Dec 2022",
    field: "Full-stack product development",
    context:
      "Worked across React interfaces and FastAPI backend features for a paint-visualisation platform serving customers across APAC.",
    color: "green",
    headline: { value: "8 countries", label: "across APAC served by the platform" },
    // proud: "[Proudest moment: one sentence]",
    metrics: [
      { value: "8", label: "APAC countries served" },
      { value: "70+", label: "backend tests" },
    ],
    skills: ["React", "FastAPI", "Python", "JavaScript", "Backend testing"],
    contributions: [
      {
        title: "Reusable, multilingual interfaces",
        text: "Reusable, multilingual React components and FastAPI features for a paint-visualisation platform used in eight APAC countries.",
      },
      {
        title: "Reliability across the product",
        text: "Fixed 30+ bugs across photo processing, billing and reports, and built a 70+ test backend suite to catch regressions before release.",
      },
    ],
    images: [],
    recommendation: "/assets/images/experience/amaris-ai/testimonial.pdf",
  },
];
