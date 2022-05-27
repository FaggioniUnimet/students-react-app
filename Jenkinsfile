pipeline {
    agent any
    stages {
        stage('Build') {
            when {
                branch 'master'
            }
            steps {
                slackSend (color: '#00FF00', message: "Build Process - Init: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                echo 'Begin Building Phase'
                sh 'composer install'
                sh './gradlew build --no-daemon'
                archiveArtifacts artifacts: 'dist/public-styles.zip'
                echo 'End Building Phase'
            }
        }
        stage('Deploying') {
             when {
                 branch 'master'
             }
            steps {
                echo 'Begin Deploying Phase'
                withCredentials([usernamePassword(credentialsId: 'webserver_login', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
                    sshPublisher(
                        failOnError: true,
                        continueOnError: false,
                        publishers: [
                            sshPublisherDesc(
                                configName: 'production',
                                verbose: true,
                                sshCredentials: [
                                    username: "$USERNAME",
                                    encryptedPassphrase: "$USERPASS"
                                ],
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'dist/public-styles.zip',
                                        removePrefix: 'dist/',
                                        remoteDirectory: '/var/www',
                                        execCommand: 'sudo systemctl stop nginx && sudo rm -rfv /var/www/public-styles/* && sudo unzip -o /var/www/public-styles.zip -d /var/www/public-styles && sudo /usr/bin/php /var/www/public-styles/artisan migrate --force && sudo rm /var/www/public-styles.zip && sudo chmod -R 777 /var/www/public-styles && sudo systemctl start nginx'
                                    )
                                ]
                            )
                        ]
                    )
                }
                echo 'End Deploying Phase'
            }
        }
    }
    post {
        success {
            slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}) - Duration (${currentBuild.durationString})")

            emailext (
                subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}] - Duration (${currentBuild.durationString})':</p>
                    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
                to: 'miguel@hqrentalsoftware.com'
            )

        }
        failure {
            slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}) - Duration (${currentBuild.durationString})")

            emailext (
                subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}] - Duration (${currentBuild.durationString})':</p>
                    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
                to: 'miguel@hqrentalsoftware.com'
            )
        }
    }
}
