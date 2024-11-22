#!/bin/sh
git pull --rebase server
echo "code sync success" >> ./deploy.log
sh ./deploy.sh

