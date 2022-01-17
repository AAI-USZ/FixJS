function() {
        doclets = srcParser.parse(__dirname + '/test/fixtures/modules/data/mod-1.js');
        expect(doclets.length).toBeGreaterThan(1);
        expect(doclets[0].longname).toEqual('module:data/mod-1');
    }