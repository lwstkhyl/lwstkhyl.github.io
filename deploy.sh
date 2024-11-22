#!/usr/bin/env bash
function deploy(){
    cd /home/wth/Desktop/lwstkhyl.github.io
    if [ "$(git pull)" != "Already up to date." ]; then
        date_time=$(date "+%Y-%m-%d %H:%M:%S")
        echo "${date_time}-----update" >> ./deploy.log
        jekyll b
        if [ $? -eq 0 ]; then
            echo "_site update success" >> ./deploy.log
        else
            echo "_site update failed" >> ./deploy.log
        fi
    fi
}
if [ -z $1 ];then
    time=60
else
    time=$1
fi
deploy
while true
do 
    sleep $time
    deploy
done
# sudo rm -rf /var/www/html/*
# sudo cp -r ./_site/* /var/www/html
# echo "file copy-paste success" >> ./deploy.log
# sudo systemctl restart apache2
# echo "apache2 restart success" >> ./deploy.log

