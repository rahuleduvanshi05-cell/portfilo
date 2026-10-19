
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
    }

    environment {
        APP_NAME  = 'projectsuchit-frontend'
        IMAGE_NAME = 'projectsuchit-frontend'
        APP_PORT = '8081'
    }

    stages {
        stage('Checkout GitHub') {
            steps {
                checkout scm
            }
        }

        stage('Check Docker') {
            steps {
                sh '''
                    set -e
                    docker --version
                    docker info >/dev/null
                '''
            }
        }

        stage('Install and Build Vue') {
            steps {
                sh '''
                    set -e

                    test -f package.json
                    test -f package-lock.json

                    docker run --rm \
                      -u "$(id -u):$(id -g)" \
                      -e HOME=/tmp \
                      -e npm_config_cache=/tmp/npm-cache \
                      -v "$WORKSPACE:/app" \
                      -w /app \
                      node:22-alpine \
                      sh -c 'node --version && npm --version && npm ci && npm run build'

                    test -f dist/index.html
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    set -e

                    docker build \
                      -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                      -t ${IMAGE_NAME}:latest .
                '''
            }
        }

        stage('Test Docker Image') {
            steps {
                sh '''
                    set -e

                    docker rm -f ${APP_NAME}-candidate 2>/dev/null || true

                    docker run -d \
                      --name ${APP_NAME}-candidate \
                      -p 127.0.0.1:8082:80 \
                      ${IMAGE_NAME}:${BUILD_NUMBER}

                    for i in $(seq 1 20); do
                      if curl -fsS http://127.0.0.1:8082/ >/dev/null; then
                        echo "Docker image health check passed"
                        docker rm -f ${APP_NAME}-candidate
                        exit 0
                      fi
                      sleep 2
                    done

                    docker logs ${APP_NAME}-candidate || true
                    docker rm -f ${APP_NAME}-candidate || true
                    exit 1
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                    set -e

                    docker rm -f ${APP_NAME} 2>/dev/null || true

                    docker run -d \
                      --restart unless-stopped \
                      --name ${APP_NAME} \
                      -p 127.0.0.1:${APP_PORT}:80 \
                      ${IMAGE_NAME}:${BUILD_NUMBER}

                    for i in $(seq 1 20); do
                      if curl -fsS http://127.0.0.1:${APP_PORT}/ >/dev/null; then
                        echo "Deployment successful"
                        exit 0
                      fi
                      sleep 2
                    done

                    docker logs ${APP_NAME} || true
                    exit 1
                '''
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Vue frontend built and deployed.'
            echo 'Website: https://projectsuchit.com'
        }

        failure {
            echo 'FAILED: Check Console Output for the failing stage.'
        }

        always {
            echo 'Pipeline completed.'
        }
    }
}
