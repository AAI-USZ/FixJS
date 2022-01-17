function () {
        var pending = 3;
        function onend () {
            if (--pending === 0) res.end();
        }
        ps.on('exit', onend);
        ps.stdout.on('end', onend);
        ps.stderr.on('end', onend);
    }