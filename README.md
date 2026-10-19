# Rahul - Modern Cloud & DevOps Engineer Portfolio

A modern, high-tech Cloud & DevOps Engineer portfolio built with **React 18**, **Vite**, and **Modern CSS**. Engineered to demonstrate real-world infrastructure expertise across AWS, Kubernetes, Terraform, GitOps, and AI Deployment Pipelines.

---

## 🚀 Key Showcase Projects Included

1. **High-Availability 2-Tier Web Application on AWS**:
   - Internet-facing Application Load Balancer (ALB) across Multi-AZ public subnets.
   - EC2 Auto Scaling Group in private subnets with auto-healing.
   - Amazon RDS PostgreSQL Multi-AZ synchronous standby failover with KMS encryption.
   - 100% codified using modular Terraform with S3 remote state and DynamoDB lock.

2. **Enterprise 3-Tier Production Cloud Architecture**:
   - Tier 1 (Presentation): CloudFront CDN + AWS WAF DDoS protection at edge + Public ALB.
   - Tier 2 (Application): Containerized micro-APIs on AWS ECS Fargate with sub-millisecond ElastiCache Redis caching.
   - Tier 3 (Database): Amazon Aurora Multi-AZ database cluster in isolated non-routable subnets.
   - Zero-downtime rolling blue/green deployment strategy via GitHub Actions.

3. **Production Microservices Platform on AWS EKS with ArgoCD (GitOps)**:
   - 6 polyglot containerized microservices deployed via Helm charts.
   - Declarative GitOps deployment & automatic drift correction using ArgoCD.
   - Horizontal Pod Autoscaler (HPA) scaling pods dynamically from 2 to 20 replicas.
   - NGINX Ingress Controller with cert-manager SSL and full Prometheus + Grafana observability.

4. **Scalable GenAI & LLM Inference Serving Pipeline**:
   - Containerized FastAPI & vLLM inference server on GPU-accelerated AWS ECS.
   - Qdrant Vector Database in private subnet for low-latency RAG (Retrieval Augmented Generation).
   - Redis semantic cache for 90% cost and latency reduction on repeated prompts.
   - CloudWatch telemetry tracking Time To First Token (TTFT) and GPU VRAM saturation.

5. **Mydoctorsportal.com - Live Healthcare Platform Cloud CI/CD**:
   - Real-world experience as Team Leader managing a live production healthcare system.
   - Reduced deployment release cycle from 45 minutes to 4 minutes using Docker and GitHub Actions.
   - Zero downtime during live telemedicine appointments.

---

## 🛠️ Features & UI Capabilities

- **Interactive Architecture Flow Inspector**: Clickable visual flow diagram for every project displaying network tiers, security groups, subnets, and node specifications.
- **Interactive CI/CD & GitOps Pipeline**: Visual release simulator showing real terminal logs, linting, Docker buildx, Terraform checks, ArgoCD sync, and CloudWatch SLO verification.
- **Dynamic Skill Filtering & Search**: Instant filter by category (*Cloud & AWS, Containers & K8s, IaC & Automation, CI/CD, Monitoring, Linux & Security*) with a real-time keyword search.
- **Dual Theme Support**: Modern high-tech Dark Mode (default) and crisp Light Mode with instant toggle and local storage persistence.
- **Interactive Contact & Quick-Copy**: Direct copy email with feedback toast, contact inquiry form, and GitHub/LinkedIn links.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
