#!/bin/bash
jekyll b
echo "_site update success"
sudo rm -rf /var/www/html/*
sudo cp -r ./_site/* /var/www/html
echo "file copy-paste success"
sudo systemctl restart apache2
echo "apache2 restart success"

