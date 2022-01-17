function(err) {
        var confTest = new Config({path:path.join(rootpath,'tmp')});
        confTest.get('test:setsave').should.equal('Yah!');
    }