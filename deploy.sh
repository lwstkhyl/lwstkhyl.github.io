#!/usr/bin/env bash
if [ -z $1 ];then
    time=60
else
    time=$1
fi
while true
do 
    sleep $time
    cd /home/wth/Desktop/lwstkhyl.github.io
    if [ "$(git pull)" = "Already up to date." ]; then
        exit
    fi
    date_time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "${date_time}-----update" >> ./deploy.log
    jekyll b
    if [ $? -eq 0 ]; then
        echo "_site update success" >> ./deploy.log
    else
        echo "_site update failed" >> ./deploy.log
    fi
done
# sudo rm -rf /var/www/html/*
# sudo cp -r ./_site/* /var/www/html
# echo "file copy-paste success" >> ./deploy.log
# sudo systemctl restart apache2
# echo "apache2 restart success" >> ./deploy.log

