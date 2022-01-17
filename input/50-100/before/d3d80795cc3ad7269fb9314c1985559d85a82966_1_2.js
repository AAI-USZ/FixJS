function() {
    stop();
    post('/layouttest', function(data) {
        equal(data, 'mylayout requested view mylayout', 'served html is correct');
        start();
    });
}