pipeline {
    agent any

    options {
        // Equivalent to 'timeout-minutes: 60'
        timeout(time: 60, unit: 'MINUTES')
        // Keeps the console log clean (optional but recommended)
        timestamps()
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Equivalent to 'npm ci'
                sh 'npm ci'
                
                // Note: Since we are using the Playwright Docker image, 
                // browsers are usually pre-installed. However, ensuring 
                // matching versions is good practice.
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Equivalent to 'npx playwright test'
                sh 'npx playwright test'
            }
        }
    }

    post {
        // Equivalent to 'if: ${{ !cancelled() }}'
        always {
            // Equivalent to 'uses: actions/upload-artifact@v4'
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            
            // Optional: If you have the "HTML Publisher" plugin installed in Jenkins:
            // publishHTML([
            //     allowMissing: false,
            //     alwaysLinkToLastBuild: true,
            //     keepAll: true,
            //     reportDir: 'playwright-report',
            //     reportFiles: 'index.html',
            //     reportName: 'Playwright Report'
            // ])
        }
    }
}