pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                // sh 'copy.bat'
                sh 'docker build -t uc1 ./uc1'
                sh 'docker tag uc1 likhith198/uc1:latest'
                sh 'docker push likhith198/uc1:latest'
                sh 'docker build -t uc2 ./uc2'
                sh 'docker tag uc1 likhith198/uc2:latest'
                sh 'docker push likhith198/uc2:latest'
                sh 'docker build -t uc3 ./uc3'
                sh 'docker tag uc3 likhith198/uc3:latest'
                sh 'docker push likhith198/uc3:latest'
                sh 'docker build -t frontend ./frontend'
                sh 'docker tag frontend likhith198/frontend:latest'
            }
        }
        
        stage('Deploy') {
            steps {
                 sh 'kubectl apply -f kubernetes.yaml'
            }
        }
    }
    
    post {
        failure {
            echo 'Pipeline failed'
        }
    }
}
