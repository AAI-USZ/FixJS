function (t) {
    t.plan(1);
    kv.init('/kvdb');
    var x = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    var y = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    var z = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    
    var K = [x,y,z].join(_);
    var V = 'Hello World';
    kv.set(K,V);
    path.exists('/kvdb/'+K, function (ex) {
        if (!ex) t.fail('K not created')
        else fs.stat('/kvdb/'+K, function (err, stat) {
            if (err) t.fail(err)
            else {
                t.equal(stat.mode & 0777, 0755);
                t.ok(stat.isFile(), 'target not a Key');
                t.end();
            }
        })
    })
}