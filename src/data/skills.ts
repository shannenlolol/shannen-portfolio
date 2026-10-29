import {
  siApachekafka, siArgo, siC, siCplusplus, siCss, siDart, siDjango, siDocker, siFastapi, siFirebase, siFlask,
  siFlutter, siGit, siGnubash, siHelm, siHtml5, siJavascript, siKubernetes, siLinux, siMaplibre, siMariadb,
  siNextdotjs, siOpenjdk, siPlotly, siPostgresql, siPython, siPytorch, siReact, siRedhatopenshift, siRos,
  siSupabase, siTensorflow, siTypescript,
} from "simple-icons";

export type Skill = {
  name: string;
  /** A Simple Icons entry. Without one, `monogram` is drawn on `colour` instead. */
  icon?: { path: string; hex: string };
  monogram?: string;
  colour?: string;
};

export const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: siPython },
      { name: "JavaScript", icon: siJavascript },
      { name: "TypeScript", icon: siTypescript },
      { name: "SQL", icon: siPostgresql },
      { name: "Java", icon: siOpenjdk },
      { name: "Dart", icon: siDart },
      { name: "C", icon: siC },
      { name: "C++", icon: siCplusplus },
      { name: "Bash", icon: siGnubash },
      { name: "HTML", icon: siHtml5 },
      { name: "CSS", icon: siCss },
    ],
  },
  {
    title: "Web & product",
    skills: [
      { name: "React", icon: siReact },
      { name: "Next.js", icon: siNextdotjs },
      { name: "FastAPI", icon: siFastapi },
      { name: "Flask", icon: siFlask },
      { name: "Dash", icon: siPlotly },
      { name: "Django", icon: siDjango },
      { name: "Flutter", icon: siFlutter },
      { name: "MapLibre", icon: siMaplibre },
    ],
  },
  {
    title: "AI & robotics",
    skills: [
      { name: "PyTorch", icon: siPytorch },
      { name: "TensorFlow", icon: siTensorflow },
      { name: "ROS 2", icon: siRos },
    ],
  },
  {
    title: "Data & storage",
    skills: [
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "Kafka", icon: siApachekafka },
      { name: "MariaDB", icon: siMariadb },
      { name: "Firebase", icon: siFirebase },
      { name: "Supabase", icon: siSupabase },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "Docker", icon: siDocker },
      { name: "Kubernetes", icon: siKubernetes },
      { name: "OpenShift", icon: siRedhatopenshift },
      { name: "Helm", icon: siHelm },
      { name: "Argo CD", icon: siArgo },
      // Simple Icons no longer carries Amazon's logos, so AWS gets a drawn badge.
      { name: "AWS", monogram: "aws", colour: "#232f3e" },
      { name: "Git", icon: siGit },
      { name: "Linux", icon: siLinux },
    ],
  },
];
