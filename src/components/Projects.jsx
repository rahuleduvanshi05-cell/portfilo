import { useState } from "react";
import Section from "./Section";
import ArchitectureDiagram from "./ArchitectureDiagram";
import "./Projects.css";
import {
  Layers,
  Server,
  Cpu,
  Boxes,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle,
  GitBranch,
} from "lucide-react";

const PROJECT_CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "2tier", label: "2-Tier App" },
  { id: "3tier", label: "3-Tier Enterprise" },
  { id: "microservices", label: "Kubernetes & Microservices" },
  { id: "ai", label: "AI & MLOps Serving" },
];

const PROJECTS = [
  {
    id: "2tier-aws",
    category: "2tier",
    badge: "2-Tier Architecture",
    badgeColor: "cyan",
    title: "High-Availability 2-Tier Web Application on AWS",
    tagline: "Fault-tolerant, auto-scaling web application architecture with multi-AZ RDS",
    summary:
      "A production-ready 2-Tier cloud infrastructure provisioned via modular Terraform. Decouples the presentation & compute layer (Internet-facing Application Load Balancer + EC2 Auto Scaling Group) from the persistence layer (Multi-AZ Amazon RDS PostgreSQL) across multiple Availability Zones with automated health self-healing.",
    highlights: [
      "Zero-downtime rolling deployments managed by AWS Auto Scaling Groups across 2 AZs",
      "Synchronous Multi-AZ standby failover on RDS with sub-60s RTO and daily snapshots",
      "Bastion Jump Host architecture with strict Security Group whitelisting and SSM access",
      "100% codified with Terraform modules, S3 remote state backend, and DynamoDB state locking",
    ],
    stack: ["AWS EC2", "AWS ALB", "Amazon RDS Multi-AZ", "Terraform", "Route 53", "CloudWatch", "VPC"],
    metrics: [
      { label: "Availability", value: "99.95% Multi-AZ" },
      { label: "Self-Healing", value: "< 60s ASG Recovery" },
      { label: "IaC Coverage", value: "100% Terraform" },
    ],
    diagram: {
      nodes: [
        {
          id: "n1",
          tier: "DNS & Edge",
          label: "Route 53 + ACM",
          icon: "globe",
          type: "default",
          details: "Amazon Route 53 provides low-latency DNS routing with ACM (AWS Certificate Manager) managing automated SSL/TLS certificates.",
          specs: ["Latency-based routing", "Automated SSL Renewal", "Health check triggers"],
        },
        {
          id: "n2",
          tier: "Tier 1: Load Balancer",
          label: "Application Load Balancer",
          icon: "alb",
          type: "default",
          details: "Internet-facing ALB deployed across 2 public subnets, distributing incoming HTTPS traffic and offloading TLS decryption.",
          specs: ["Health checks every 15s", "Target group routing", "Cross-zone load balancing"],
        },
        {
          id: "n3",
          tier: "Tier 1: Compute",
          label: "EC2 Auto Scaling Group",
          icon: "compute",
          type: "default",
          details: "Web servers running in private subnets across 2 AZs. Scales dynamically between 2 and 6 instances based on CPU utilization.",
          specs: ["Launch templates", "Scale out at 70% CPU", "Multi-AZ placement"],
        },
        {
          id: "n4",
          tier: "Tier 2: Database",
          label: "Amazon RDS Multi-AZ",
          icon: "db",
          type: "db",
          details: "Managed PostgreSQL database in isolated private DB subnets with synchronous replication to a standby instance in another AZ.",
          specs: ["Automatic Multi-AZ failover", "Automated daily backups", "Encrypted with AWS KMS"],
        },
        {
          id: "n5",
          tier: "Observability",
          label: "CloudWatch & SNS",
          icon: "monitor",
          type: "default",
          details: "CloudWatch alarms monitoring ALB 5xx errors, EC2 CPU thresholds, and RDS storage saturation with automated Slack/Email alerts.",
          specs: ["Metric filters", "Composite alarms", "SNS alert dispatch"],
        },
      ],
    },
  },
  {
    id: "3tier-enterprise",
    category: "3tier",
    badge: "3-Tier Enterprise",
    badgeColor: "purple",
    title: "Enterprise 3-Tier Production Cloud Architecture",
    tagline: "Segregated Web, App & DB tiers with CloudFront, ECS Fargate, Aurora & Redis",
    summary:
      "An enterprise-scale 3-Tier cloud platform engineered for mission-critical workloads. Enforces strict network segmentation across 6 subnets: Web tier (CloudFront CDN + ALB), Application tier (AWS ECS Fargate containers in private subnets with Redis caching), and Data tier (Amazon Aurora Multi-AZ database cluster in isolated non-routable subnets).",
    highlights: [
      "Strict 3-tier network segmentation: Public, Private App, and Non-routable Data subnets",
      "45% reduced database latency via Amazon ElastiCache (Redis) query caching",
      "Containerized micro-services orchestrated with AWS ECS Fargate serverless compute",
      "Customer-managed AWS KMS encryption for all EBS volumes, RDS data, and S3 assets",
    ],
    stack: ["AWS ECS Fargate", "CloudFront + WAF", "Amazon Aurora RDS", "ElastiCache Redis", "Terraform", "GitHub Actions", "Docker"],
    metrics: [
      { label: "Edge Latency", value: "< 40ms via CDN" },
      { label: "Architecture", value: "3 Isolated Tiers" },
      { label: "Deployment", value: "Blue/Green Zero-Downtime" },
    ],
    diagram: {
      nodes: [
        {
          id: "e1",
          tier: "Presentation: Edge",
          label: "CloudFront CDN + WAF",
          icon: "globe",
          type: "default",
          details: "Global content delivery network with AWS WAF protection against DDoS, rate limiting, and SQL injection at the edge.",
          specs: ["Global Edge Locations", "AWS WAF Managed Rules", "Gzip / Brotli Compression"],
        },
        {
          id: "e2",
          tier: "Tier 1: Web Tier",
          label: "Public ALB & Nginx",
          icon: "alb",
          type: "default",
          details: "Dual-AZ Application Load Balancer performing path-based routing (/api/* to backend, /* to static frontend assets).",
          specs: ["Path-based routing", "TLS 1.3 protocol", "Sticky sessions"],
        },
        {
          id: "e3",
          tier: "Tier 2: Application Tier",
          label: "ECS Fargate Micro-APIs",
          icon: "compute",
          type: "default",
          details: "Serverless container tasks running in isolated private subnets with auto-scaling based on incoming request counts and memory usage.",
          specs: ["Zero EC2 management", "IAM Task Execution Roles", "Rolling Blue/Green updates"],
        },
        {
          id: "e4",
          tier: "Tier 2: Caching",
          label: "ElastiCache (Redis)",
          icon: "ai",
          type: "default",
          details: "In-memory Redis cluster caching frequent database queries, session states, and rate limit counters with sub-millisecond latency.",
          specs: ["Sub-millisecond reads", "Multi-node replication", "Automatic failover"],
        },
        {
          id: "e5",
          tier: "Tier 3: Persistence",
          label: "Amazon Aurora Multi-AZ",
          icon: "db",
          type: "db",
          details: "High-performance PostgreSQL-compatible relational database with automated storage auto-scaling and dedicated read replicas.",
          specs: ["6-way storage replication", "Isolated non-routable subnets", "KMS envelope encryption"],
        },
      ],
    },
  },
  {
    id: "microservices-k8s",
    category: "microservices",
    badge: "Kubernetes & GitOps",
    badgeColor: "emerald",
    title: "Production Microservices Platform on AWS EKS with ArgoCD",
    tagline: "Resilient EKS cluster with Helm charts, GitOps declarative delivery, and Prometheus",
    summary:
      "A production-grade Kubernetes microservices platform built on Amazon EKS. Features 6 containerized polyglot microservices deployed via Helm package manager, continuously synchronized and reconciled via ArgoCD GitOps, with Ingress-NGINX SSL termination and automated Horizontal Pod Autoscaling (HPA).",
    highlights: [
      "6 decoupled microservices communicating via REST and internal gRPC with namespace network policies",
      "ArgoCD declarative GitOps: Automated sync, drift detection, and single-click rollbacks",
      "Horizontal Pod Autoscaler (HPA) automatically scaling workloads from 2 to 20 pods during traffic surges",
      "Full observability: Prometheus scraping metrics, Grafana dashboards tracking P95/P99 latency, and Alertmanager",
    ],
    stack: ["Kubernetes (EKS)", "Helm", "ArgoCD", "Docker", "NGINX Ingress", "Prometheus & Grafana", "GitHub Actions"],
    metrics: [
      { label: "Workloads", value: "6 Microservices" },
      { label: "Delivery", value: "100% GitOps (ArgoCD)" },
      { label: "Autoscaling", value: "HPA 2 - 20 Pods" },
    ],
    diagram: {
      nodes: [
        {
          id: "k1",
          tier: "Ingress",
          label: "NGINX Ingress + Cert-Manager",
          icon: "alb",
          type: "default",
          details: "Kubernetes Ingress controller terminating TLS traffic using Let's Encrypt certificates managed automatically by cert-manager.",
          specs: ["SSL Termination", "Host & path routing", "Rate limiting annotations"],
        },
        {
          id: "k2",
          tier: "Orchestration",
          label: "AWS EKS Control Plane",
          icon: "k8s",
          type: "k8s",
          details: "Fully managed Kubernetes cluster control plane spread across 3 AZs with IAM Roles for Service Accounts (IRSA) for least privilege.",
          specs: ["Multi-AZ Control Plane", "IRSA AWS security integration", "Managed Node Groups"],
        },
        {
          id: "k3",
          tier: "Workloads",
          label: "Microservices Pods (HPA)",
          icon: "compute",
          type: "default",
          details: "Pods for Auth, Orders, Catalog, and Payments running with resource limits, liveness/readiness probes, and HPA auto-scaling.",
          specs: ["Rolling update zero-downtime", "Liveness & Readiness probes", "Secrets via K8s secrets"],
        },
        {
          id: "k4",
          tier: "Continuous Delivery",
          label: "ArgoCD GitOps Engine",
          icon: "globe",
          type: "default",
          details: "Declarative GitOps continuous delivery tool reconciling Git repo manifests with the live EKS cluster state automatically.",
          specs: ["Automated drift correction", "Self-healing deployments", "One-click canary rollback"],
        },
        {
          id: "k5",
          tier: "Observability",
          label: "Prometheus & Grafana",
          icon: "monitor",
          type: "default",
          details: "Comprehensive metric collection from cAdvisor and node exporters with rich operational dashboards for cluster utilization.",
          specs: ["PromQL query engine", "P95/P99 latency tracking", "Alertmanager Slack integration"],
        },
      ],
    },
  },
  {
    id: "ai-mlops-deploy",
    category: "ai",
    badge: "AI & MLOps Serving",
    badgeColor: "purple",
    title: "Scalable GenAI & LLM Inference Serving Pipeline",
    tagline: "Containerized FastAPI & vLLM inference server on AWS ECS GPU with Qdrant Vector DB",
    summary:
      "Engineered an enterprise AI serving architecture for open-source Large Language Models and embedding pipelines. Packages FastAPI and vLLM inside multi-stage Docker containers with GPU acceleration, orchestrated on AWS ECS with auto-scaling based on request concurrency. Features a dedicated Qdrant vector database for RAG context retrieval and Redis for semantic caching.",
    highlights: [
      "Sub-350ms P95 inference response time with Redis semantic caching for repeated prompts",
      "Asynchronous Celery & Redis task queue managing long token generation tasks without API timeouts",
      "Production containerized Qdrant Vector DB in a private subnet for low-latency RAG vector search",
      "Automated CI/CD pipeline building model container images, running vulnerability scans, and pushing to ECR",
    ],
    stack: ["FastAPI", "vLLM / PyTorch", "Docker (GPU)", "AWS ECS / EC2", "Qdrant Vector DB", "Redis", "CloudWatch", "GitHub Actions"],
    metrics: [
      { label: "P95 Latency", value: "< 350ms with Cache" },
      { label: "RAG DB", value: "Qdrant Vector DB" },
      { label: "Engine", value: "vLLM GPU Accelerated" },
    ],
    diagram: {
      nodes: [
        {
          id: "a1",
          tier: "API Layer",
          label: "ALB + FastAPI Gateway",
          icon: "alb",
          type: "default",
          details: "High-throughput asynchronous FastAPI gateway handling request authentication, prompt validation, and rate limiting.",
          specs: ["Async request handling", "Pydantic payload validation", "API key authentication"],
        },
        {
          id: "a2",
          tier: "Semantic Cache",
          label: "Redis Semantic Cache",
          icon: "ai",
          type: "default",
          details: "Stores prompt vector embeddings and checks incoming queries for high-similarity matches to serve instant cached responses.",
          specs: ["Embedding similarity match", "90% cost reduction on common prompts", "TTL expiration"],
        },
        {
          id: "a3",
          tier: "Vector Retrieval",
          label: "Qdrant Vector DB (RAG)",
          icon: "db",
          type: "db",
          details: "High-performance vector search engine running in a private subnet, storing enterprise documentation embeddings for RAG augmentation.",
          specs: ["HNSW index for fast search", "Cosine distance metric", "Encrypted vector storage"],
        },
        {
          id: "a4",
          tier: "Inference Engine",
          label: "vLLM on AWS ECS GPU",
          icon: "ai",
          type: "ai",
          details: "PagedAttention LLM serving engine running on GPU-backed AWS instances with dynamic batching and continuous throughput.",
          specs: ["PagedAttention memory optimization", "Dynamic continuous batching", "GPU utilization alarms"],
        },
        {
          id: "a5",
          tier: "Telemetry",
          label: "CloudWatch AI Telemetry",
          icon: "monitor",
          type: "default",
          details: "Monitors Time to First Token (TTFT), tokens-per-second throughput, and GPU VRAM saturation with automated scale-out triggers.",
          specs: ["TTFT tracking", "GPU memory alarms", "Inference cost dashboards"],
        },
      ],
    },
  },
  {
    id: "healthcare-platform",
    category: "microservices",
    badge: "Live Production Platform",
    badgeColor: "cyan",
    title: "Mydoctorsportal.com - Live Healthcare Platform Cloud CI/CD",
    tagline: "Modernizing a live multi-role healthcare application with Docker and GitHub Actions",
    summary:
      "Served as Team Leader directing the architecture and cloud deployment of a live healthcare portal. Spearheaded the containerization of the Node.js/Express backend and Vue 3 frontend, designed automated GitHub Actions CI/CD pipelines, integrated MongoDB Atlas with automated backups, and established zero-downtime rolling releases.",
    highlights: [
      "Transitioned deployment from manual 45-min process to 4-min automated CI/CD pipeline",
      "Engineered multi-role authentication (Patients, Doctors, Clinics, Admins) with JWT and RBAC",
      "Configured automated SSL/TLS certificates, health check alarms, and zero-downtime rolling updates",
      "Managed production uptime, database snapshot schedules, and log monitoring",
    ],
    stack: ["Node.js", "Express", "Vue 3", "MongoDB Atlas", "Docker", "GitHub Actions", "AWS"],
    metrics: [
      { label: "Role", value: "Team Leader" },
      { label: "Deploy Time", value: "45m -> 4m (90% faster)" },
      { label: "Status", value: "Live Production System" },
    ],
    diagram: {
      nodes: [
        {
          id: "h1",
          tier: "Client",
          label: "Vue 3 SPA + Nginx",
          icon: "globe",
          type: "default",
          details: "Responsive frontend application built with Vue 3, packaged in a lightweight Alpine Linux Nginx Docker container.",
          specs: ["Multi-stage Docker build", "Static asset caching", "Gzip compression"],
        },
        {
          id: "h2",
          tier: "Backend",
          label: "Node.js / Express API",
          icon: "compute",
          type: "default",
          details: "RESTful API handling doctor appointments, telemedicine scheduling, JWT verification, and email notifications.",
          specs: ["JWT & RBAC middleware", "Rate limiting protection", "Winston structured logging"],
        },
        {
          id: "h3",
          tier: "Database",
          label: "MongoDB Atlas Replica Set",
          icon: "db",
          type: "db",
          details: "Managed multi-node MongoDB replica set with automated point-in-time recovery and encrypted data-at-rest.",
          specs: ["Replica set automatic failover", "Daily automated snapshots", "IP Access List isolation"],
        },
        {
          id: "h4",
          tier: "Automation",
          label: "GitHub Actions CI/CD",
          icon: "globe",
          type: "default",
          details: "Automated test suite, Docker container build, security image scanning, and automated deployment trigger to AWS.",
          specs: ["Automated PR checks", "Zero-downtime rolling release", "Discord/Slack notifications"],
        },
      ],
    },
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedDiagramId, setExpandedDiagramId] = useState("2tier-aws");

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeCategory === "all") return true;
    return proj.category === activeCategory;
  });

  const toggleDiagram = (id) => {
    setExpandedDiagramId((prev) => (prev === id ? null : id));
  };

  return (
    <Section
      id="projects"
      tag="Architecture & Production Deployments"
      title="Featured Cloud Projects"
      subtitle="Comprehensive deployments covering 2-Tier, 3-Tier Enterprise architectures, Kubernetes Microservices with GitOps, and Scalable GenAI Serving."
    >
      {/* Category Filter Tabs */}
      <div className="projects__tabs" role="tablist" aria-label="Project categories">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={activeCategory === cat.id}
            className={`projects__tab ${
              activeCategory === cat.id ? "projects__tab--active" : ""
            }`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="projects__list">
        {filteredProjects.map((project) => {
          const isDiagramOpen = expandedDiagramId === project.id;
          return (
            <article key={project.id} className="project-card">
              <div className="project-card__header">
                <div className="project-card__badge-row">
                  <span className={`badge badge--${project.badgeColor || "cyan"}`}>
                    {project.badge}
                  </span>
                </div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__tagline">{project.tagline}</p>
              </div>

              <p className="project-card__summary">{project.summary}</p>

              {/* Key Architecture Highlights */}
              <div className="project-card__highlights-box">
                <h4 className="project-card__highlights-title">
                  <ShieldCheck size={16} /> Key Cloud & DevOps Highlights:
                </h4>
                <ul className="project-card__highlights-list">
                  {project.highlights.map((h, i) => (
                    <li key={i}>
                      <CheckCircle size={14} className="project-card__highlight-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics Grid */}
              <div className="project-card__metrics">
                {project.metrics.map((m, i) => (
                  <div key={i} className="project-card__metric-item">
                    <span className="project-card__metric-val">{m.value}</span>
                    <span className="project-card__metric-lbl">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="project-card__stack">
                {project.stack.map((t) => (
                  <span key={t} className="project-card__stack-tag">
                    {t}
                  </span>
                ))}
              </div>

              {/* Interactive Architecture Flow Toggle */}
              <div className="project-card__actions">
                <button
                  type="button"
                  className="btn btn--secondary btn--sm project-card__diagram-btn"
                  onClick={() => toggleDiagram(project.id)}
                  aria-expanded={isDiagramOpen}
                >
                  <Layers size={16} />
                  <span>
                    {isDiagramOpen ? "Hide Architecture Flow" : "Inspect Architecture Flow"}
                  </span>
                  {isDiagramOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {/* Architecture Diagram Canvas */}
              {isDiagramOpen && (
                <div className="project-card__diagram-wrapper">
                  <ArchitectureDiagram diagramData={project.diagram} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
