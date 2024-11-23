const http = require('http')

const shpath = '/home/wth/Desktop/lwstkhyl/lwstkhyl.github.io/deploy.sh';
const hostname = "0.0.0.0";
const port = 8888;

function RunCmd(cmd, args, cb) {
    const spawn = require('child_process').spawn;
    const child = spawn(cmd, args);
    let result = '';
    child.stdout.on('data', function (data) {
        result += data.toString();
    });
    child.stdout.on('end', function () {
        cb(result)
    });
}

function deploy() {
    RunCmd('sh', [shpath], function (result) {
        console.log(result);
    });
}

const server = http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("success");
});

server.listen(port, hostname, () => {
    console.log("listen start");
});
