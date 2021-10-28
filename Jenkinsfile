pipeline {
  agent {
    kubernetes {
      inheritFrom 'node-fermium'
    }
  }
  environment {
    LOCAL_REPOSITORY = "${LOCAL_REGISTRY}/molgenis/molgenis-app-pseudonym-registration"
  }
  stages {
    stage('Prepare') {
      steps {
        script {
          env.GIT_COMMIT = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
        }
        container('vault') {
          script {
            env.TUNNEL_IDENTIFIER = sh(script: 'echo ${GIT_COMMIT}-${BUILD_NUMBER}', returnStdout: true)
            env.GITHUB_TOKEN = sh(script: 'vault read -field=value secret/ops/token/github', returnStdout: true)
            env.CODECOV_TOKEN = sh(script: 'vault read -field=molgenis-app-biobank-explorer secret/ops/token/codecov', returnStdout: true)
            env.REGISTRY_CRED_USR = sh(script: 'vault read -field=username secret/ops/account/nexus', returnStdout: true)
            env.REGISTRY_CRED_PSW = sh(script: 'vault read -field=password secret/ops/account/nexus', returnStdout: true)
            env.NEXUS_AUTH = sh(script: 'vault read -field=base64 secret/ops/account/nexus', returnStdout: true)
          }
        }
      }
    }
    stage('Build: [ pull request ]') {
      when {
        changeRequest()
      }
      steps {
        container('node') {
          sh "yarn install"
          sh "yarn test:unit"
        }
      }
      post {
        always {
          container('node') {
            fetch_codecov()
            sh "./codecov -c -F unit -K -C ${GIT_COMMIT}"
          }
        }
      }
    }
    stage('Build: [ master ]') {
      when {
        branch 'master'
      }
      steps {
        milestone 1
        container('node') {
          sh "yarn install"
          sh "yarn test:unit"
        }
      }
      post {
        always {
          container('node') {
            fetch_codecov()
            sh "./codecov -c -F unit -K -C ${GIT_COMMIT}"
          }
        }
      }
    }
    stage('Release: [ master ]') {
      when {
        branch 'master'
      }
      environment {
        REPOSITORY = 'molgenis/molgenis-app-pseudonym-registration'
      }
      steps {
        timeout(time: 30, unit: 'MINUTES') {
          script {
            env.RELEASE_SCOPE = input(
              message: 'Do you want to release?',
              ok: 'Release',
              parameters: [
                choice(choices: 'patch\nminor\nmajor', description: '', name: 'RELEASE_SCOPE')
              ]
            )
          }
        }
        milestone 2
        container('node') {
          sh "git remote set-url origin https://${GITHUB_TOKEN}@github.com/${REPOSITORY}.git"

          sh "git checkout -f ${BRANCH_NAME}"

          sh "npm config set unsafe-perm true"
          sh "npm version ${RELEASE_SCOPE} -m '[ci skip] [npm-version] %s'"

          sh "git push --tags origin ${BRANCH_NAME}"
          molgenisSlack(message: "${env.REPOSITORY} has been successfully deployed on ${env.LOCAL_REGISTRY}.", status:'SUCCESS', channel: "#release")
        }
      }
    }
  }
  post {
    failure {
      molgenisSlack(message: 'Build failed', status:'ERROR', channel: '#pr-app-team')
    }
  }
}