const skills = [
  { category: "Cloud & deployment", items: ["Docker", "Kubernetes", "OpenShift", "Helm", "Argo CD", "Git", "Linux", "Bash", "AWS EC2", "S3", "Lambda", "ECR"] },
  { category: "Backend & data", items: ["Python", "Java", "SQL", "FastAPI", "Flask", "Django", "Dash", "Kafka", "PostgreSQL", "MariaDB", "Firebase", "AWS Athena"] },
  { category: "Machine learning", items: ["PyTorch", "TensorFlow", "AWS SageMaker"] },
  { category: "Interfaces & mobile", items: ["JavaScript", "HTML", "CSS", "React", "Dart", "Flutter"] },
  { category: "Systems & robotics", items: ["C", "C++", "ROS2"] },
];

export default function SkillsPage() {
  return (
    <main id="main-content" className="skills-page">
      <p className="eyebrow">Skills / Inside my toolkit</p>
      <h1>What grows here.</h1>
      <p className="skills-intro">The tools I reach for, grouped by what they help me build.</p>
      <dl className="garden-toolkit">
        {skills.map((group, i) => (
          <div className="toolkit-group" key={group.category}>
            <dt><span aria-hidden="true">0{i + 1}</span>{group.category}</dt>
            <dd><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></dd>
          </div>
        ))}
      </dl>
      <div className="skills-footnote">
        <p>See these tools in practice.</p>
        <a className="text-link" href="/experience">Explore my experience ↗</a>
      </div>
    </main>
  );
}
