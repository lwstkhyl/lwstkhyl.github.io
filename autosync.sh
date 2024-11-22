#!/bin/sh
git status
git add *
git commit -m "server code change"
git pull --rebase server
git push server
git stash pop
echo "code sync success"
sh ./deploy.sh

