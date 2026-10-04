const skills = [
  { category: "Languages", items: ["Python", "Java", "JavaScript", "Dart", "C", "C++", "SQL", "Bash", "HTML", "CSS"] },
  { category: "Frameworks & libraries", items: ["React", "Flutter", "FastAPI", "Flask", "Django", "Dash", "PyTorch", "TensorFlow", "ROS2"] },
  { category: "Data & storage", items: ["PostgreSQL", "MariaDB", "Firebase", "Kafka", "AWS Athena", "S3"] },
  { category: "Cloud & tools", items: ["Docker", "Kubernetes", "OpenShift", "Helm", "Argo CD", "Git", "Linux", "AWS EC2", "Lambda", "ECR", "AWS SageMaker"] },
];

export default function SkillsPage() {
  return (
    <main id="main-content" className="skills-page">
      <p className="eyebrow">Skills / Inside my toolkit</p>
      <h1>What grows here.</h1>
      <p className="skills-intro">The languages, frameworks, and tools I use to bring ideas to life.</p>
      <dl className="garden-toolkit">
        {skills.map((group) => (
          <div className="toolkit-group" key={group.category}>
            <dt>{group.category}</dt>
            <dd><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></dd>
          </div>
        ))}
      </dl>
      <div className="skills-footnote">
        <p>See these tools in practice.</p>
        <a className="text-link" href="/experience">Explore my experience</a>
      </div>
    </main>
  );
}
