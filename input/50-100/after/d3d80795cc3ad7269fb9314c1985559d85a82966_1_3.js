function() {
    expect(1);
    stop();
    server.close();
    server = createServer({
        'view options': {layout: true},
        views: options.root + '/2'
    });

    post('/views/test', {mylocal: "mylocal"}, function(data) {
        equal(data, 'abc mylocal', 'template and layout rendered correctly');
        server.close();
        server = createServer();
        start();
    });
}