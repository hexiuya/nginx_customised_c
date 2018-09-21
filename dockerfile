FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY static-page-c /usr/share/nginx/html
