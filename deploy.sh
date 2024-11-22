#!/usr/bin/env bash
PATH="$PATH:/home/wth/gems/bin"
# source ~/.bash_profile
# source ~/.bashrc
# source /etc/profile
# export JEKYLL_HOME=/home/wth/gems
# export PATH=$PATH:$JEKYLL_HOME/bin
cd /home/wth/Desktop/lwstkhyl.github.io
if [ "$(git pull)" = "Already up to date." ]; then
    exit
fi
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "${time}-----update" >> ./deploy.log
jekyll b
if [ $? -eq 0 ]; then
    echo "_site update success" >> ./deploy.log
else
    echo "_site update failed" >> ./deploy.log
fi
# sudo rm -rf /var/www/html/*
# sudo cp -r ./_site/* /var/www/html
# echo "file copy-paste success" >> ./deploy.log
# sudo systemctl restart apache2
# echo "apache2 restart success" >> ./deploy.log

