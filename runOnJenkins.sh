docker stop nginx_customised_c
docker rm nginx_customised_c
docker image rm nginx_customised_c
docker build . -t nginx_customised_c
docker run -d -p 80:80 --name nginx_customised_c --network crm-network --network-alias alias-nginx-c nginx_customised_c
