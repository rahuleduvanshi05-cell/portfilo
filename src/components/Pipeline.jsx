import { useEffect, useState } from "react";
import "./Pipeline.css";
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  Terminal,
  ShieldCheck,
  Cpu,
  GitCommit,
  Container,
  Cloud,
  Activity,
} from "lucide-react";

const STAGES = [
  {
    id: "commit",
    label: "Git Commit",
    tool: "GitHub Actions",
    icon: GitCommit,
    cmd: "git push origin main",
    logs: [
      "[INFO] Push detected on branch 'main' (commit: 7c4e91a)",
      "[INFO] Webhook dispatched to GitHub Actions runner",
      "[SUCCESS] Runner environment initialized: ubuntu-latest (Node.js 20)",
    ],
  },
  {
    id: "lint-security",
    label: "Security & Lint",
    tool: "Trivy & ESLint",
    icon: ShieldCheck,
    cmd: "npm run lint && trivy fs --severity HIGH,CRITICAL .",
    logs: [
      "[INFO] Running ESLint checks across repository...",
      "[INFO] Running Trivy vulnerability filesystem scanner...",
      "[PASS] 0 critical or high vulnerabilities detected",
      "[SUCCESS] Code style and vulnerability checks passed cleanly",
    ],
  },
  {
    id: "test",
    label: "Automated Tests",
    tool: "Jest & Supertest",
    icon: CheckCircle2,
    cmd: "npm run test -- --coverage",
    logs: [
      "[INFO] Executing 42 unit and integration test suites...",
      "[INFO] Validating auth middleware, RDS connection pool & API routes",
      "[PASS] 42/42 tests passed in 4.8s (Coverage: 94.2%)",
      "[SUCCESS] All automated assertions succeeded",
    ],
  },
  {
    id: "package",
    label: "Docker & ECR",
    tool: "Docker Buildx",
    icon: Container,
    cmd: "docker buildx build --platform linux/amd64 -t aws-ecr/api:v2.4 . --push",
    logs: [
      "[INFO] Multi-stage build started (Stage 1: builder, Stage 2: distroless)",
      "[INFO] Layer caching hit (7/9 layers cached)",
      "[INFO] Final image size: 68MB. Signing container image with Cosign...",
      "[SUCCESS] Pushed image digest: sha256:91dfa3... to AWS ECR",
    ],
  },
  {
    id: "iac",
    label: "Terraform Plan",
    tool: "Terraform Cloud",
    icon: Cpu,
    cmd: "terraform plan -no-color && terraform apply -auto-approve",
    logs: [
      "[INFO] S3 remote backend synchronized; lock acquired on DynamoDB",
      "[INFO] Validating VPC, ALB Target Groups and EKS cluster manifests",
      "[INFO] Infrastructure drift check: 0 differences detected",
      "[SUCCESS] Terraform state locked & infrastructure ready for deployment",
    ],
  },
  {
    id: "deploy",
    label: "ArgoCD GitOps",
    tool: "Kubernetes / ArgoCD",
    icon: Cloud,
    cmd: "argocd app sync production-cluster --prune",
    logs: [
      "[INFO] Initiating declarative sync on AWS EKS production namespace",
      "[INFO] Rolling update: deploying new pod replicas (1 of 3, 2 of 3, 3 of 3)",
      "[INFO] Liveness and readiness HTTP probes responding 200 OK",
      "[SUCCESS] Zero-downtime blue/green rollout complete",
    ],
  },
  {
    id: "monitor",
    label: "CloudWatch SLO",
    tool: "Prometheus & AWS",
    icon: Activity,
    cmd: "aws cloudwatch get-metric-data --metric-name TargetResponseTime",
    logs: [
      "[INFO] Synthetics canary running post-deployment health check...",
      "[INFO] ALB latency: 22ms | 5xx error rate: 0.00% | CPU utilization: 34%",
      "[PASS] All CloudWatch alarms reporting OK state",
      "[SUCCESS] Release v2.4 successfully promoted to 100% production traffic",
    ],
  },
];

export default function Pipeline() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % STAGES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [playing]);

  const restartPipeline = () => {
    setActive(0);
    setPlaying(true);
  };

  const currentStage = STAGES[active];

  return (
    <div className="pipeline-wrapper">
      <div className="pipeline-card">
        {/* Card Header */}
        <div className="pipeline-card__header">
          <div className="pipeline-card__title-group">
            <span className="badge badge--emerald">
              <span className="pipeline-pulse-dot" /> CI/CD Automation Live
            </span>
            <h3 className="pipeline-card__title">Production Deployment Pipeline</h3>
          </div>

          <div className="pipeline-card__controls">
            <button
              type="button"
              className="btn btn--secondary btn--sm pipeline-ctrl-btn"
              onClick={() => setPlaying(!playing)}
              title={playing ? "Pause animation" : "Resume animation"}
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
              <span>{playing ? "Pause" : "Play"}</span>
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--sm pipeline-ctrl-btn"
              onClick={restartPipeline}
              title="Restart from Stage 1"
            >
              <RotateCcw size={14} />
              <span>Restart</span>
            </button>
          </div>
        </div>

        {/* Pipeline Stepper Nodes */}
        <div className="pipeline-stepper" role="tablist">
          {STAGES.map((s, index) => {
            const isDone = index < active;
            const isCurrent = index === active;
            const Icon = s.icon;

            return (
              <div key={s.id} className="pipeline-step-item">
                <button
                  type="button"
                  className={`pipeline-node ${
                    isCurrent
                      ? "pipeline-node--current"
                      : isDone
                      ? "pipeline-node--done"
                      : "pipeline-node--pending"
                  }`}
                  onClick={() => {
                    setPlaying(false);
                    setActive(index);
                  }}
                  title={`Stage ${index + 1}: ${s.label}`}
                >
                  <div className="pipeline-node__icon">
                    <Icon size={16} />
                  </div>
                  <div className="pipeline-node__text">
                    <span className="pipeline-node__tool">{s.tool}</span>
                    <span className="pipeline-node__label">{s.label}</span>
                  </div>
                  <span className="pipeline-node__status-dot" />
                </button>

                {index < STAGES.length - 1 && (
                  <div
                    className={`pipeline-step-line ${
                      isDone ? "pipeline-step-line--done" : ""
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Live Terminal Console for Current Stage */}
        <div className="pipeline-console">
          <div className="pipeline-console__top">
            <div className="pipeline-console__info">
              <Terminal size={14} className="pipeline-console__icon" />
              <span>
                Stage {active + 1} of {STAGES.length}: <strong>{currentStage.label}</strong> ({currentStage.tool})
              </span>
            </div>
            <div className="pipeline-console__elapsed">
              <Clock size={13} />
              <span>Runtime: 0m {(active * 18 + 12)}s</span>
            </div>
          </div>

          <div className="pipeline-console__body">
            <div className="pipeline-console__cmd">
              <span className="pipeline-prompt">$</span> {currentStage.cmd}
            </div>

            <div className="pipeline-console__logs">
              {currentStage.logs.map((log, i) => {
                let colorClass = "log--info";
                if (log.startsWith("[SUCCESS]") || log.startsWith("[PASS]")) {
                  colorClass = "log--success";
                }
                return (
                  <div key={i} className={`pipeline-log-entry ${colorClass}`}>
                    {log}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
