FROM jenkins/jenkins:lts

COPY --from=docker:dind /usr/local/bin/docker /usr/local/bin

USER root

RUN usermod -aG root jenkins

COPY --chown=jenkins:jenkins plugins.txt /usr/share/jenkins/ref/plugins.txt

RUN jenkins-plugin-cli -f /usr/share/jenkins/ref/plugins.txt

USER jenkins