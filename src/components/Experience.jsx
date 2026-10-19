import Section from "./Section";
import "./Experience.css";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Cloud,
  Layers,
} from "lucide-react";

const TIMELINE = [
  {
    period: "July 2023 – Present",
    role: "Team Leader & Cloud Operations",
    company: "Mydocin IT Solutions Pvt Ltd",
    location: "Faridabad, India",
    type: "Full-Time",
    current: true,
    description:
      "Spearheaded technical leadership and architecture for Mydoctorsportal.com, a high-traffic live healthcare and telemedicine platform.",
    achievements: [
      "Engineered full CI/CD automation using GitHub Actions and Docker, reducing release deployment cycles from 45 minutes to 4 minutes.",
      "Architected backend micro-APIs with Node.js/Express and MongoDB Atlas replica sets, establishing automated daily backup snapshots and failovers.",
      "Implemented enterprise security features including JWT authentication, Role-Based Access Control (RBAC) across 4 user tiers, and automated SSL/TLS termination.",
      "Mentored a cross-functional team of 6 engineers on Git workflows, containerization best practices, and code review standards.",
    ],
    tags: ["AWS", "Docker", "Node.js", "MongoDB Atlas", "GitHub Actions", "Nginx", "Team Leadership"],
  },
  {
    period: "2023 – Present",
    role: "Cloud & DevOps Architecture Practitioner",
    company: "Independent Infrastructure Projects",
    location: "Self-Driven Hands-on Labs",
    type: "Practice & Deployments",
    current: true,
    description:
      "Designed and deployed enterprise multi-tier architectures and Kubernetes platforms strictly adhering to AWS Well-Architected Framework principles.",
    achievements: [
      "Codified 2-Tier and 3-Tier production AWS architectures using modular Terraform with remote state locking via S3 and DynamoDB.",
      "Configured AWS EKS Kubernetes clusters with Helm charts, Ingress-NGINX controllers, and declarative GitOps synchronization via ArgoCD.",
      "Implemented full observability pipelines: Prometheus scraping node/pod metrics, Grafana dashboards tracking P95 latency, and CloudWatch alarms.",
      "Engineered containerized AI inference serving pipelines for Large Language Models using FastAPI and GPU acceleration on AWS ECS.",
    ],
    tags: ["Terraform", "Kubernetes (EKS)", "ArgoCD", "Prometheus", "Grafana", "AWS CloudWatch", "Python"],
  },
];

export default function Experience() {
  return (
    <Section
      id="experience"
      tag="Work History & Leadership"
      title="Professional Experience"
      subtitle="Proven track record in driving software releases, orchestrating production cloud migrations, and managing cross-functional engineering teams."
    >
      <div className="experience-timeline">
        {TIMELINE.map((item, index) => (
          <div key={index} className="exp-card">
            <div className="exp-card__header">
              <div className="exp-card__meta">
                <span className="exp-card__period">
                  <Calendar size={13} />
                  <span>{item.period}</span>
                </span>
                <span className="badge badge--cyan">{item.type}</span>
                {item.current && (
                  <span className="badge badge--emerald">
                    <span className="exp-pulse" /> Active Role
                  </span>
                )}
              </div>

              <h3 className="exp-card__role">{item.role}</h3>
              <div className="exp-card__company-row">
                <span className="exp-card__company">{item.company}</span>
                <span className="exp-card__location">
                  <MapPin size={13} /> {item.location}
                </span>
              </div>
            </div>

            <p className="exp-card__desc">{item.description}</p>

            <div className="exp-card__achievements">
              <h4 className="exp-card__achievements-title">Key Contributions &amp; Impact:</h4>
              <ul className="exp-card__points">
                {item.achievements.map((point, i) => (
                  <li key={i}>
                    <CheckCircle2 size={15} className="exp-card__point-icon" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="exp-card__tags">
              {item.tags.map((t) => (
                <span key={t} className="exp-card__tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
