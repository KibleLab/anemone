FROM nginx

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx-configs/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html
COPY /build/ /usr/share/nginx/html
EXPOSE 80