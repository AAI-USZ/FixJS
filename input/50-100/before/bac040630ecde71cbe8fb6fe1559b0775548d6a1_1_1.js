function (ex) {
        if (!ex) t.fail('K not created')
        else fs.stat('/kvdb/'+K, function (err, stat) {
            if (err) t.fail(err)
            else {
                t.equal(stat.mode & 0777, 0755);
                t.ok(stat.isFile(), 'target not a Key');
                t.end();
            }
        })
    }