FROM cypress/browsers:node12.14.1-chrome85-ff81

WORKDIR /app

COPY ./cypress/support/cypress-exec.sh .

ENV PATH ./node_modules/.bin:$PATH

ENTRYPOINT [ "./cypress-exec.sh" ]
