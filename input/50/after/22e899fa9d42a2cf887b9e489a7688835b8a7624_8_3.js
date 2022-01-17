function() {
        doclets = srcParser.parse(env.dirname + '/test/fixtures/modules/data/mod-2.js');
        expect(doclets.length).toBeGreaterThan(1);
        expect(doclets[0].longname).toEqual('module:my/module/name');
    }