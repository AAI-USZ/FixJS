function() {
    expect(1);
    stop();
    post('/partialtest', {test: {a: 1}}, function(data) {
        equal(data, '<div>1</div>', 'data is an object');
        start();
    });
}