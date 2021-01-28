FROM node:10.16.3-alpine as node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build -- --prod

FROM nginx:1.13
COPY --from=node /app/dist/sigo-frontend /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf