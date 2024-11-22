sudo systemctl start apache2
echo "apache2 start"
sudo systemctl status apache2
nohup node deploy.js>deploy.log 2>&1 &
echo "deploy.js start"

