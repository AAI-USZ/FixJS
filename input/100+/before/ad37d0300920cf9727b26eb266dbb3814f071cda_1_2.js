function() {

    var confDev = new Config({env:'development',path:path.join(rootpath,'tmp')});
    var confTest = new Config({env:'test',path:path.join(rootpath,'tmp')});

    confDev.set('test:v1','v1');
    confDev.get('test:v1').should.equal('v1');
    confDev.save(function(err) {
        (fs.existsSync || path.existsSync)(confDev.file);
    });

    confTest.set('test:v1','v1');
    confTest.get('test:v1').should.equal('v1');
    confTest.save(function(err) {
        (fs.existsSync || path.existsSync)(confTest.file);
    });

}