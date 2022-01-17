function serviceRespond (service, file, res) {
    function pack (s) {
        var n = (4 + s.length).toString(16);
        return Array(4 - n.length + 1).join('0') + n + s;
    }
    res.write(pack('# service=git-' + service + '\n'));
    res.write('0000');
    
    var ps = spawn('git-' + service, [
        '--stateless-rpc',
        '--advertise-refs',
        file
    ]);
    ps.stdout.pipe(res, { end : false });
    ps.stderr.pipe(res, { end : false });
    
    (function () {
        var pending = 3;
        function onend () {
            if (--pending === 0) res.end();
        }
        ps.on('exit', onend);
        ps.stdout.on('end', onend);
        ps.stderr.on('end', onend);
    })();
}