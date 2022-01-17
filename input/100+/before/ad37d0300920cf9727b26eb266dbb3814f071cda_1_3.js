function() {

    var conf = new Config({path:path.join(rootpath,'tmp')});
    conf.setSave('test:setsave','Yah!',function(err) {
        var confTest = new Config({path:path.join(rootpath,'tmp')});
        confTest.get('test:setsave').should.equal('Yah!');
    });

}