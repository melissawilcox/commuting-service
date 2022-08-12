FROM node:16.5-alpine
LABEL maintainer "Melissa Wilcox <melissa@emdubb.co>"

RUN apk add postgresql
RUN apk add aws-cli --update-cache --repository http://dl-3.alpinelinux.org/alpine/v3.12/community/
RUN apk add curl

WORKDIR /app
COPY . .

ARG GITHUB_ACCESS_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=\${GITHUB_ACCESS_TOKEN}" > ~/.npmrc

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

RUN npm install
RUN apk add --no-cache git
RUN rm ~/.npmrc

CMD ["npm", "start"]
