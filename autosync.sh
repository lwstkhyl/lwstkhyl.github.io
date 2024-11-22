#!/bin/sh
git pull
echo "code sync success" >> ./deploy.log
sh ./deploy.sh

