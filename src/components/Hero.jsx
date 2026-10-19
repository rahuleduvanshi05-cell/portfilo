import { useState } from "react";
import "./Hero.css";
import {
  Cloud,
  Terminal as TerminalIcon,
  Server,
  ArrowRight,
  Download,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const CLOUD_BADGES = [
  "AWS Solutions",
  "Kubernetes & EKS",
  "Terraform IaC",
  "Docker & Microservices",
  "CI/CD & GitOps",
  "AI Inference Serving",
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("bash");

  return (
    <section id="home" className="hero">
      <div className="hero__inner">
        {/* Left Column: Headline and Call-to-actions */}
        <div className="hero__content">
          {/* Live Status Pill */}
          <div className="hero__status-pill">
            <span className="hero__status-dot" />
            <span className="hero__status-text">
              AWS us-east-1 &bull; Active &bull; Open for Cloud / DevOps Roles
            </span>
          </div>

          <h1 className="hero__title">
            Architecting <span className="text-gradient">Cloud-Native</span> & Resilient Infrastructures
          </h1>

          <p className="hero__lead">
            I&apos;m <strong>Rahul</strong>, a Cloud &amp; DevOps Engineer with a solid full-stack development foundation (3+ years leading live production systems). I specialize in designing <strong>2-Tier &amp; 3-Tier AWS environments</strong>, <strong>Kubernetes microservices with GitOps</strong>, and <strong>automated CI/CD pipelines</strong> that run with zero downtime.
          </p>

          {/* Quick Badges */}
          <div className="hero__badges">
            {CLOUD_BADGES.map((badge) => (
              <span key={badge} className="hero__badge">
                <CheckCircle2 size={13} className="hero__badge-icon" />
                <span>{badge}</span>
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">
              <span>View Cloud Projects</span>
              <ArrowRight size={16} />
            </a>
            <a className="btn btn--secondary" href="#contact">
              <span>Contact Me</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">3+ Yrs</span>
              <span className="hero__stat-label">Software &amp; Cloud Exp</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">99.9%</span>
              <span className="hero__stat-label">Production SLA Uptime</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">100%</span>
              <span className="hero__stat-label">Declarative IaC</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Cloud Terminal / Cluster Console */}
        <div className="hero__terminal-wrapper">
          <div className="hero__terminal">
            <div className="hero__terminal-top">
              <div className="hero__terminal-dots">
                <span className="hero__terminal-dot hero__terminal-dot--red" />
                <span className="hero__terminal-dot hero__terminal-dot--yellow" />
                <span className="hero__terminal-dot hero__terminal-dot--green" />
              </div>
              <div className="hero__terminal-title">
                <TerminalIcon size={14} />
                <span>cloud-shell &bull; aws-cli &amp; kubectl</span>
              </div>
              <div className="hero__terminal-tabs">
                <button
                  type="button"
                  className={`hero__term-tab ${activeTab === "bash" ? "active" : ""}`}
                  onClick={() => setActiveTab("bash")}
                >
                  terraform
                </button>
                <button
                  type="button"
                  className={`hero__term-tab ${activeTab === "k8s" ? "active" : ""}`}
                  onClick={() => setActiveTab("k8s")}
                >
                  k8s
                </button>
              </div>
            </div>

            <div className="hero__terminal-body">
              {activeTab === "bash" ? (
                <div className="hero__terminal-code">
                  <p className="code-line">
                    <span className="prompt">$</span> <span className="cmd">terraform apply -auto-approve</span>
                  </p>
                  <p className="code-output text-dim">module.vpc.aws_vpc.main: Creating...</p>
                  <p className="code-output text-dim">module.alb.aws_lb.public_alb: Creating...</p>
                  <p className="code-output text-dim">module.ecs.aws_ecs_cluster.prod: Creating...</p>
                  <p className="code-output text-dim">module.rds.aws_db_instance.multi_az: Creating...</p>
                  <p className="code-output text-emerald">
                    &check; Apply complete! Resources: 24 added, 0 changed, 0 destroyed.
                  </p>
                  <p className="code-output text-cyan">
                    Outputs: alb_dns = &quot;prod-alb-19842.us-east-1.elb.amazonaws.com&quot;
                  </p>
                  <p className="code-line">
                    <span className="prompt">$</span> <span className="cursor">&block;</span>
                  </p>
                </div>
              ) : (
                <div className="hero__terminal-code">
                  <p className="code-line">
                    <span className="prompt">$</span> <span className="cmd">kubectl get pods -n production</span>
                  </p>
                  <p className="code-output text-dim">
                    NAME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;READY &nbsp;STATUS &nbsp;&nbsp;&nbsp;RESTARTS
                  </p>
                  <p className="code-output">
                    api-gateway-6f98-k29 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1 &nbsp;&nbsp;&nbsp;<span className="text-emerald">Running</span> &nbsp;0 (3d)
                  </p>
                  <p className="code-output">
                    ai-inference-vllm-gpu-0 &nbsp;&nbsp;&nbsp;1/1 &nbsp;&nbsp;&nbsp;<span className="text-emerald">Running</span> &nbsp;0 (5d)
                  </p>
                  <p className="code-output">
                    argocd-server-7c4d-x82 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1 &nbsp;&nbsp;&nbsp;<span className="text-emerald">Running</span> &nbsp;0 (12d)
                  </p>
                  <p className="code-output text-cyan">
                    &bull; HPA Target: CPU 42% / 70% &bull; Health: ALL_HEALTHY
                  </p>
                  <p className="code-line">
                    <span className="prompt">$</span> <span className="cursor">&block;</span>
                  </p>
                </div>
              )}
            </div>

            {/* Terminal Live Health Bar */}
            <div className="hero__terminal-footer">
              <div className="hero__term-health">
                <span className="hero__term-health-dot" />
                <span>Cluster Status: Healthy (us-east-1)</span>
              </div>
              <span className="hero__term-uptime">Uptime: 99.98%</span>
            </div>
          </div>

          {/* Floating Accents */}
          <div className="hero__float-card hero__float-card--top">
            <Server size={18} className="hero__float-icon" />
            <div>
              <span className="hero__float-title">Multi-AZ Resilient</span>
              <span className="hero__float-sub">Zero Single Point of Failure</span>
            </div>
          </div>

          <div className="hero__float-card hero__float-card--bottom">
            <ShieldCheck size={18} className="hero__float-icon hero__float-icon--green" />
            <div>
              <span className="hero__float-title">CI/CD GitOps Live</span>
              <span className="hero__float-sub">Automated ArgoCD Sync</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
