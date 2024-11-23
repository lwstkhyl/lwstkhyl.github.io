const http = require('http');
const { join } = require('path');

const shpath = '/home/wth/Desktop/lwstkhyl/lwstkhyl.github.io/deploy.sh';
const hostname = "0.0.0.0";
const port = 8888;
const password = "wthlyhshpy";

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

let encoder = new TextEncoder();
async function verifySignature(secret, header, payload) {
    let parts = header.split("=");
    let sigHex = parts[1];
    let algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };
    let keyBytes = encoder.encode(secret);
    let extractable = false;
    let key = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        algorithm,
        extractable,
        ["sign", "verify"],
    );
    let sigBytes = hexToBytes(sigHex);
    let dataBytes = encoder.encode(payload);
    let equal = await crypto.subtle.verify(
        algorithm.name,
        key,
        sigBytes,
        dataBytes,
    );
    return equal;
}
function hexToBytes(hex) {
    let len = hex.length / 2;
    let bytes = new Uint8Array(len);
    let index = 0;
    for (let i = 0; i < hex.length; i += 2) {
        let c = hex.slice(i, i + 2);
        let b = parseInt(c, 16);
        bytes[index] = b;
        index += 1;
    }
    return bytes;
}

const server = http.createServer(function (req, res) {
    req.on("data", chunk => {
        const headers = req.headers;
        if (
            req.method === "post" &&
            headers["x-github-event"] === "push" &&
            verifySignature(password, headers["X-Hub-Signature-256"], chunk)
        ) {
            console.log("from github");
        }
        console.log(chunk);
        console.log(headers["x-github-event"]);
        console.log(headers["X-Hub-Signature-256"]);
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("success");
    });
});

server.listen(port, hostname, () => {
    console.log("listen start");
});
