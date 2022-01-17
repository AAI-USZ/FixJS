function() {
    expect(1);
    stop();
    var data = {
            test: [
                {a: 1},
                {a: 2},
                {a: 3}
            ]
        };
    post('/partialtest', data, function(data) {
        equal(data, '<div>1</div><div>2</div><div>3</div>', 'data is an array');
        start();
    });
}