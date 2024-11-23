#!/usr/bin/env bash
cd /home/wth/Desktop/lwstkhyl.github.io
pull_res=$(git pull)
if [ "$pull_res" != "Already up to date." ]; then
    date_time=$(date "+%Y-%m-%d %H:%M:%S")
    echo "${date_time}-----update" >> ./deploy.log
    if [[ "$pull_res" =~ "package.json" ]]; then
        npm update
        if [ $? -eq 0 ]; then
            echo "NodeJS package update success" >> ./deploy.log
        else
            echo "NodeJS package update failed" >> ./deploy.log
        fi
    fi
    jekyll b
    if [ $? -eq 0 ]; then
        echo "_site update success" >> ./deploy.log
    else
        echo "_site update failed" >> ./deploy.log
    fi
fi
