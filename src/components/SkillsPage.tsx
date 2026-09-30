const skills = [
  {
    category: "languages",
    items: [
      "python",
      "javascript",
      "sql",
      "java",
      "c",
      "c++",
      "dart",
      "html",
      "css",
    ],
  },
  {
    category: "frameworks",
    items: [
      "react",
      "fastapi",
      "flask",
      "dash",
      "django",
      "flutter",
      "ros2",
      "pytorch",
      "tensorflow",
    ],
  },
  {
    category: "tools",
    items: [
      "docker",
      "kubernetes",
      "openshift",
      "helm",
      "argocd",
      "kafka",
      "postgresql",
      "mariadb",
      "firebase",
      "git",
      "linux",
      "bash",
    ],
  },
  {
    category: "aws",
    items: ["ec2", "s3", "lambda", "ecr", "athena", "sagemaker"],
  },
];

export default function SkillsPage() {
  return (
    <main id="main-content" className="skills-page">
      <p className="eyebrow">Skills / My toolkit</p>
      <h1>
        The tools behind
        <br />
        <span className="serif-accent">the things I build.</span>
      </h1>
      <p className="skills-intro">
        Across interfaces, backend systems, machine learning, and deployment.
      </p>
      <section className="skills-terminal" aria-label="Technical skills">
        <div className="terminal-chrome" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="terminal-command">
          <span aria-hidden="true">~</span> skills --all
        </p>
        <dl className="terminal-output">
          {skills.map((group) => (
            <div
              className={`terminal-row terminal-${group.category}`}
              key={group.category}
            >
              <dt>{group.category}</dt>
              <dd>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
        <div className="terminal-prompt" aria-hidden="true">
          ~ <span className="terminal-cursor" />
        </div>
      </section>
      <div className="skills-footnote">
        <p>See these tools in practice.</p>
        <a className="text-link" href="/experience">
          Explore my experience
        </a>
      </div>
    </main>
  );
}
