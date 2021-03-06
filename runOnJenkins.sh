###################
# dockerising app #
###################
docker stop nginx_customised_c
docker rm nginx_customised_c
docker image rm nginx_customised_c
docker build . -t nginx_customised_c
docker run -d -p 80:80 -v /home/xiuya/UAT/nginx_customised_c/static-page-c:/usr/share/nginx/html --name nginx_customised_c --network crm-network --network-alias alias-nginx-c nginx_customised_c

####################
#Jmeter test starts#
####################
#cd /home/xiuya/Apps/apache-jmeter-4.0/bin
#/home/xiuya/Apps/apache-jmeter-4.0/bin/jmeter.sh -Jjmeter.save.saveservice.output_format=xml -n -t plans/crm-test.jmx -l plans/project/crm-test/crm-test-testResult.jtl

