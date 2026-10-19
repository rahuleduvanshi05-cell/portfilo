# ==============================================================================
# Stage 1: Build the React + Vite Application
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies based on lockfile for deterministic, cached builds
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source code
COPY . .

# Build production bundle (outputs to /app/dist)
RUN npm run build

# ==============================================================================
# Stage 2: Serve with Production-Hardened Nginx
# ==============================================================================
FROM nginx:1.27-alpine AS production

# Install curl for container HEALTHCHECK
RUN apk --no-cache add curl

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose standard HTTP port
EXPOSE 80

# Health check to ensure Nginx is responding with 200 OK
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/health || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
