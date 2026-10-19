import { useState } from "react";
import Section from "./Section";
import "./Skills.css";
import {
  Cloud,
  Container,
  Cpu,
  GitBranch,
  Activity,
  Shield,
  Terminal,
  Server,
  Layers,
  Database,
  Search,
  CheckCircle2,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Skills", icon: Layers },
  { id: "cloud", label: "Cloud & AWS", icon: Cloud },
  { id: "containers", label: "Containers & K8s", icon: Container },
  { id: "iac", label: "IaC & Automation", icon: Cpu },
  { id: "cicd", label: "CI/CD & GitOps", icon: GitBranch },
  { id: "monitoring", label: "Monitoring & Logs", icon: Activity },
  { id: "security", label: "Linux & Security", icon: Shield },
];

const SKILLS_DATA = [
  // Cloud & AWS
  {
    name: "AWS Core Infrastructure",
    category: "cloud",
    level: "Advanced",
    icon: Cloud,
    badge: "AWS",
    desc: "VPC, Public/Private Subnets, Internet & NAT Gateways, Route Tables, Security Groups, NACLs.",
    highlight: "Multi-AZ resilient VPCs",
  },
  {
    name: "Compute & Auto Scaling",
    category: "cloud",
    level: "Advanced",
    icon: Server,
    badge: "AWS",
    desc: "EC2 instances, AMI baking, Auto Scaling Groups (ASG), Launch Templates, AWS Lambda serverless.",
    highlight: "Dynamic scaling with target tracking",
  },
  {
    name: "Load Balancing & Traffic",
    category: "cloud",
    level: "Advanced",
    icon: Layers,
    badge: "AWS",
    desc: "Application Load Balancer (ALB), Network Load Balancer (NLB), Route 53 DNS routing, CloudFront CDN.",
    highlight: "Path-based routing & SSL termination",
  },
  {
    name: "Managed Cloud Databases",
    category: "cloud",
    level: "Proficient",
    icon: Database,
    badge: "Data",
    desc: "Amazon RDS (PostgreSQL/MySQL) with Multi-AZ failover & read replicas, DynamoDB, MongoDB Atlas, ElastiCache Redis.",
    highlight: "Automated snapshot & automated failover",
  },
  {
    name: "Storage & IAM Security",
    category: "cloud",
    level: "Advanced",
    icon: Shield,
    badge: "Security",
    desc: "S3 lifecycle policies & bucket encryption, IAM roles, granular policies, least-privilege access, AWS KMS.",
    highlight: "Zero public S3 exposure & RBAC",
  },

  // Containers & K8s
  {
    name: "Docker & Containerization",
    category: "containers",
    level: "Advanced",
    icon: Container,
    badge: "Containers",
    desc: "Multi-stage Dockerfiles for lean images (<80MB), Docker Compose multi-service stacks, vulnerability scans.",
    highlight: "Production-grade hardened containers",
  },
  {
    name: "Kubernetes (EKS & K8s)",
    category: "containers",
    level: "Proficient",
    icon: Layers,
    badge: "Orchestration",
    desc: "Deployments, Services, Ingress-NGINX, ConfigMaps, Secrets, Horizontal Pod Autoscaler (HPA), Namespaces.",
    highlight: "Self-healing & zero-downtime rollouts",
  },
  {
    name: "Helm & Packaging",
    category: "containers",
    level: "Proficient",
    icon: Container,
    badge: "Kubernetes",
    desc: "Authoring Helm charts, values override files for Dev/Staging/Prod, managing versioned releases in K8s.",
    highlight: "Templated multi-environment releases",
  },
  {
    name: "Container Registries",
    category: "containers",
    level: "Proficient",
    icon: Server,
    badge: "DevOps",
    desc: "AWS ECR with image lifecycle rules, vulnerability scanning on push, Docker Hub automated webhooks.",
    highlight: "Secure automated image pipelines",
  },

  // IaC & Automation
  {
    name: "Terraform (IaC)",
    category: "iac",
    level: "Advanced",
    icon: Cpu,
    badge: "IaC",
    desc: "HCL modular architecture, remote S3 state storage with DynamoDB state locking, workspaces, plan/apply pipelines.",
    highlight: "100% reproducible cloud infrastructure",
  },
  {
    name: "Ansible Configuration",
    category: "iac",
    level: "Working Knowledge",
    icon: Terminal,
    badge: "Automation",
    desc: "Automated server provisioning, idempotency, writing playbooks for Nginx, Docker runtime, and security hardening.",
    highlight: "Automated node configuration",
  },
  {
    name: "Python Automation & Boto3",
    category: "iac",
    level: "Advanced",
    icon: Terminal,
    badge: "Scripting",
    desc: "AWS SDK (Boto3) scripts for EBS cleanup, automated AMI snapshots, CloudWatch metric monitors, and Slack alerts.",
    highlight: "CloudOps automation & cost savings",
  },

  // CI/CD & GitOps
  {
    name: "GitHub Actions CI/CD",
    category: "cicd",
    level: "Advanced",
    icon: GitBranch,
    badge: "CI/CD",
    desc: "Building multi-job workflows, automated linting & test suites, Docker build-and-push to ECR, deployment triggers.",
    highlight: "Fully automated pull-request validation",
  },
  {
    name: "ArgoCD & GitOps",
    category: "cicd",
    level: "Proficient",
    icon: Layers,
    badge: "GitOps",
    desc: "Declarative continuous delivery on Kubernetes. Auto-sync, drift detection, canary/blue-green deployments.",
    highlight: "Git as single source of truth",
  },
  {
    name: "Jenkins & Pipelines",
    category: "cicd",
    level: "Working Knowledge",
    icon: Server,
    badge: "CI/CD",
    desc: "Declarative Jenkinsfiles, master-agent architecture with Docker executors, webhook integrations with GitHub.",
    highlight: "Containerized pipeline execution",
  },

  // Monitoring & Observability
  {
    name: "Prometheus & Alertmanager",
    category: "monitoring",
    level: "Proficient",
    icon: Activity,
    badge: "Metrics",
    desc: "Node exporter, cAdvisor container metrics, PromQL queries, alerting rules for latency, error rates, and CPU spikes.",
    highlight: "SLI / SLO observability tracking",
  },
  {
    name: "Grafana Dashboards",
    category: "monitoring",
    level: "Proficient",
    icon: Activity,
    badge: "Visualization",
    desc: "Designing executive & operational dashboards for cluster health, application RPS, P95/P99 latency, and saturation.",
    highlight: "Real-time infrastructure health visualizer",
  },
  {
    name: "AWS CloudWatch & Logs",
    category: "monitoring",
    level: "Advanced",
    icon: Activity,
    badge: "AWS",
    desc: "CloudWatch metric alarms, log metric filters, SNS notification triggers, composite alarms for critical services.",
    highlight: "Proactive failure detection & alerts",
  },

  // Linux & Security
  {
    name: "Linux Systems & Bash",
    category: "security",
    level: "Advanced",
    icon: Terminal,
    badge: "OS",
    desc: "Systemd services, SSH key management, cronjobs, file permissions, log parsing (awk, sed, grep), performance tuning.",
    highlight: "Production Linux server administration",
  },
  {
    name: "Cloud Networking & Nginx",
    category: "security",
    level: "Advanced",
    icon: Server,
    badge: "Network",
    desc: "TCP/IP, CIDR blocks, DNS resolution, Nginx reverse proxy, load balancing, rate limiting, SSL/TLS cert management.",
    highlight: "High-performance edge proxy config",
  },
  {
    name: "Cloud Security & Compliance",
    category: "security",
    level: "Proficient",
    icon: Shield,
    badge: "Security",
    desc: "Vulnerability audits with Trivy, Secrets management (AWS Secrets Manager, KMS), zero hardcoded credentials.",
    highlight: "DevSecOps posture & secret isolation",
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory =
      activeCategory === "all" || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.highlight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Section
      id="skills"
      tag="Tech Stack & Core Competencies"
      title="Cloud & DevOps Skills"
      subtitle="Production-proven expertise in designing, automating, securing, and maintaining scalable cloud infrastructures."
    >
      {/* Competency Highlights Banner */}
      <div className="skills__stats">
        <div className="skills__stat-card">
          <span className="skills__stat-num">AWS</span>
          <span className="skills__stat-label">Core Cloud Platform</span>
        </div>
        <div className="skills__stat-card">
          <span className="skills__stat-num">K8s & Docker</span>
          <span className="skills__stat-label">Container Ecosystem</span>
        </div>
        <div className="skills__stat-card">
          <span className="skills__stat-num">Terraform</span>
          <span className="skills__stat-label">Declarative IaC</span>
        </div>
        <div className="skills__stat-card">
          <span className="skills__stat-num">GitOps</span>
          <span className="skills__stat-label">ArgoCD & GitHub Actions</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="skills__controls">
        <div className="skills__tabs" role="tablist" aria-label="Skill categories">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`skills__tab ${
                  activeCategory === cat.id ? "skills__tab--active" : ""
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="skills__search">
          <Search size={18} className="skills__search-icon" />
          <input
            type="text"
            placeholder="Search skills (e.g. Terraform, Docker, VPC)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="skills__search-input"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="skills__grid">
        {filteredSkills.map((skill) => {
          const Icon = skill.icon;
          return (
            <div key={skill.name} className="skill-card">
              <div className="skill-card__header">
                <div className="skill-card__icon-wrapper">
                  <Icon size={22} className="skill-card__icon" />
                </div>
                <div className="skill-card__meta">
                  <span className="badge badge--cyan">{skill.badge}</span>
                  <span className="skill-card__level">{skill.level}</span>
                </div>
              </div>

              <h3 className="skill-card__title">{skill.name}</h3>
              <p className="skill-card__desc">{skill.desc}</p>

              <div className="skill-card__footer">
                <CheckCircle2 size={15} className="skill-card__check" />
                <span className="skill-card__highlight">{skill.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="skills__empty">
          <p>No skills found matching &ldquo;{searchQuery}&rdquo;. Try another search term or select All Skills.</p>
        </div>
      )}
    </Section>
  );
}
