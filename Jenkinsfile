pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "sandeep1118"
        IMAGE_BACKEND = "sandeep1118/backend"
        IMAGE_FRONTEND = "sandeep1118/frontend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/sandeep-thakur1811/two-tier-nodejs.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $IMAGE_BACKEND:latest ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $IMAGE_FRONTEND:latest ./frontend'
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $IMAGE_BACKEND:latest
                    docker push $IMAGE_FRONTEND:latest
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f k8s/
                kubectl rollout restart deployment backend -n two-tier
                kubectl rollout restart deployment frontend -n two-tier
                '''
            }
        }
    }
}

