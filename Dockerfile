FROM node:14 as BUILDER

ADD . /app

WORKDIR /app

RUN yarn
RUN yarn build

FROM nginx:1.15-alpine

# Copy site file
COPY --from=BUILDER /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]