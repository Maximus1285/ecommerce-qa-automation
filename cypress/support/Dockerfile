FROM mysql as base

FROM cypress/browsers:node12.14.1-chrome85-ff81

COPY --from=base /var/lib/mysql /var/lib/mysql
COPY --from=base /usr/bin/mysql /usr/bin/mysql

ENV CI=1 DEBIAN_FRONTEND=noninteractive
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION="us-east-1"

WORKDIR /home/node/app

#Linux setup
RUN apt-get update \
    && apt-get install -y \
    xvfb \
    xorg \
    python3 \
    less

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip && ./aws/install

ENV AWS_ACCESS_KEY_ID $AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY $AWS_SECRET_ACCESS_KEY
ENV AWS_DEFAULT_REGION $AWS_DEFAULT_REGION
