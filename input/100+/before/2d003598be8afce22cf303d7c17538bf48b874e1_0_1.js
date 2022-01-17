function (t) {
    t.plan(2);
    
    var cwd = process.cwd();
    process.chdir(__dirname);
    
    var ps = spawn(process.execPath, [
        path.resolve(__dirname, '../bin/cmd.js'),
        '-r', 'seq',
        '--exports=require'
    ]);
    var src = '';
    ps.stdout.on('data', function (buf) { src += buf });
    
    ps.on('exit', function (code) {
        t.equal(code, 0);
        
        var c = {};
        vm.runInNewContext(src, c);
        t.equal(typeof c.require('seq'), 'function');
    });
}