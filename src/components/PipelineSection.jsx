import Pipeline from "./Pipeline";
import Section from "./Section";
import "./PipelineSection.css";
import { GitPullRequest, ShieldCheck, Zap, BarChart2 } from "lucide-react";

export default function PipelineSection() {
  return (
    <Section
      id="pipeline"
      tag="DevOps & GitOps Delivery"
      title="How I Automate Production Releases"
      subtitle="Every commit triggers an automated, reproducible workflow: linting, vulnerability audits, multi-stage container packaging, Terraform infrastructure checks, ArgoCD GitOps sync, and automated CloudWatch health verification."
    >
      <div className="pipeline-section-layout">
        {/* Interactive Pipeline Simulator */}
        <Pipeline />

        {/* Core Principles Grid below pipeline */}
        <div className="pipeline-principles">
          <div className="principle-card">
            <div className="principle-card__icon">
              <ShieldCheck size={20} />
            </div>
            <h4 className="principle-card__title">Shift-Left DevSecOps</h4>
            <p className="principle-card__desc">
              Container images and dependencies are scanned automatically on every PR with Trivy before hitting any cloud registry.
            </p>
          </div>

          <div className="principle-card">
            <div className="principle-card__icon">
              <Zap size={20} />
            </div>
            <h4 className="principle-card__title">Zero-Downtime Rollouts</h4>
            <p className="principle-card__desc">
              Blue/Green and rolling deployments with Kubernetes and AWS ALB target groups ensure zero user impact during production updates.
            </p>
          </div>

          <div className="principle-card">
            <div className="principle-card__icon">
              <GitPullRequest size={20} />
            </div>
            <h4 className="principle-card__title">Git as Source of Truth</h4>
            <p className="principle-card__desc">
              All infrastructure and application manifests live in Git; ArgoCD automatically detects drift and reconciles cluster state.
            </p>
          </div>

          <div className="principle-card">
            <div className="principle-card__icon">
              <BarChart2 size={20} />
            </div>
            <h4 className="principle-card__title">Observability First</h4>
            <p className="principle-card__desc">
              Synthetics canaries, Prometheus metrics, and CloudWatch alarms monitor latency and 5xx rates post-deploy to trigger auto-rollbacks.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
