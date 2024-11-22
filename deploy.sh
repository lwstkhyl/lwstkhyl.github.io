#!/bin/bash
jekyll b
echo "_site update success" >> ./deploy.log
sudo rm -rf /var/www/html/*
sudo cp -r ./_site/* /var/www/html
echo "file copy-paste success" >> ./deploy.log
sudo systemctl restart apache2
echo "apache2 restart success" >> ./deploy.log

