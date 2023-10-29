### Run from project root
### docker build --no-cache -t transcription-ai -f ./Dockerfile .
### docker run -p 8081:80 transcription-ai

#### -----> Stage 1
FROM node:lts-alpine as angular-transcription-ai

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g npm@10.2.1
RUN npm install
COPY . .
RUN npm run build:prod

#### -----> Stage 2
FROM nginx:stable-alpine
VOLUME /var/cache/nginx
COPY --from=angular-transcription-ai /app/dist/transcription-ai /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
