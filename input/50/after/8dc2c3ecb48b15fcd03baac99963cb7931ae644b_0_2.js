function(cmds) {
        assert.ok(cmds.length == 1);        
        assert.equal('purge obj.http.X-Cache-Channel ~ \"^test_db:(.*test_cache.*)|(table)$\"\n', cmds[0].toString('utf8'));
    }