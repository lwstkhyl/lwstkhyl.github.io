const http = require('http');
const crypto = require('crypto');
const util = require('util');
const shell = require('shelljs');

const shpath = '/home/wth/Desktop/lwstkhyl.github.io';
const hostname = "0.0.0.0";
const port = 8888;
const password = "wthlyhshpy";

function deploy() {
    shell.exec(`bash ${shpath}/new_deploy.sh`);
}

let encoder = new TextEncoder();
async function verifySignature(secret, header, payload) {
    let parts = header ? header.split("=") : "=".split("=");
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
    const headers = req.headers;
    let body = "";
    req.on("data", chunk => {
        body += chunk;
    });
    req.on("end", () => {
        verifySignature(password, headers["x-hub-signature-256"], body).then((verify_res) => {
            if (verify_res) {
                console.log("github push");
                deploy();
            } else {
                console.log("not from github");
            }
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            res.end("request receive");
        });
    });
});

server.listen(port, hostname, () => {
    console.log("listen start");
});
