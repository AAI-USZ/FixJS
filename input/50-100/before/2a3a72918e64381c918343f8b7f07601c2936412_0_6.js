function() {
    // first create queue
    var queue = new varnish.VarnishQueue('127.0.0.1', 1234)
    for(var i = 0; i < 10; ++i) {
        queue.run_cmd('purge simon_is == the_best');
    }
    // then server
    var server = VarnishEmu(null, 1234)
    //wait 2 seconds because the client tries every second the reconnection
    setTimeout(function() { assert.equal(10, server.commands); }, 2000);
}