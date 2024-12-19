pipeline{
    agent any
    stages{
        stage('Verificar tool'){
            steps{
                sh 'docker info'
            }
        }
        stage('Build docker image'){
            steps{
                sh 'docker build -t backend-register:latest ./backend/'
            }
        }
        stage('Run docker image'){
            steps{
                sh 'docker run -dit --name backend-register:latest backend-register:latest'
            }
        }
        stage('Run specs'){
            steps{
                sh 'docker exec backend-register:latest python test.py'
            }
        }
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Run build frontend images'){
            steps {

                script{
                    docker.withRegistry('', 'docker-id') {

                        def frontend = docker.build("jtiradoxxx/frontend-register:latest", "-f ./frontend/Dockerfile ./frontend")

                        /* Push the container to the custom Registry */
                        frontend.push()
                    }
                }
            }      
        }
        stage('Run build backend images'){
            steps {

                script{
                    docker.withRegistry('', 'docker-id') {
                        def backend = docker.build("jtiradoxxx/backend-register:latest", "-f ./backend/Dockerfile ./backend")
                        /* Push the container to the custom Registry */
                        backend.push()
                    }
                }
            }      
        }
        stage('Run deploy'){
            steps {
                withKubeConfig([credentialsId: 'config']) {
                    sh 'curl -LO "https://dl.k8s.io/release/v1.30.0/bin/linux/amd64/kubectl"'
                    sh 'chmod u+x ./kubectl'
                    sh './kubectl get pods'
                    sh './kubectl rollout restart deployment backend-app-deployment'
                    sh './kubectl rollout restart deployment frontend-app-deployment'
                }
            }
        }

    }
    post{
        always{
            sh 'docker stop avatares-dev-jenkins-backend'
            sh 'docker rm avatares-dev-jenkins-backend'
        }
        success {
            echo 'Pipeline succeeded!'
        }
    }
}