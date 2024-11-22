var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'wthlyhshpy' })

function RunCmd(cmd, args, cb) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var result = '';
    child.stdout.on('data', function (data) {
        result += data.toString();
    });
    child.stdout.on('end', function () {
        cb(result)
    });
}
function get_time(){
	const date = new Date();
	return date.toLocaleString(); 
}
function deploy(){
    var shpath = './autosync.sh';
    console.log(`{get_time()}:deploy`);
    RunCmd('sh', [shpath], function (result) {
		console.log(result);
    });
}

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 200;
	deploy();
        res.end('no such location');
    })
}).listen(8888)

handler.on('push', function (event) {
    deploy();
})

