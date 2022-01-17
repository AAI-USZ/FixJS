function(elements) {
        assert.equal(elements.length, 2);
        assert.equal(elements[0].tag, der.OBJECT_IDENTIFIER);
        assert.equal(elements[1].tag, der.SEQUENCE);

        var args = generic.parse(elements[1].buffer);
        assert.equal(args.length, 2);
        assert.equal(args[0].tag, der.OCTET_STRING);
        assert.equal(args[1].tag, der.INTEGER);

        var algorithmOid = elements[0].value;
        var salt = args[0].value;
        var iterations = args[1].value;
        
        var algorithmName = Pkcs.oid[algorithmOid];
        if (algorithmName == 'pbeWithSHAAnd40BitRC2-CBC') {
            elements.createCipher = function(password) {
                var key = createPkcs12Info(password, salt, 5, iterations, 1);
                var iv = createPkcs12Info(password, salt, 8, iterations, 2);
                return crypto.createDecipheriv('rc2-40-cbc', key.toString('binary'), iv.toString('binary'));
            };
        } else if (algorithmName == 'pbeWithSHAAnd3-KeyTripleDES-CBC') {
            elements.createCipher = function(password) {
                var key = createPkcs12Info(password, salt, 24, iterations, 1);
                var iv = createPkcs12Info(password, salt, 8, iterations, 2);
                return crypto.createDecipheriv('des-ede3-cbc', key.toString('binary'), iv.toString('binary'));
            };
        } else {
            throw new Error('Unknown algorithmId ' + bagId);
        }
    }