function (test, done) {
    var es = new sse.EventSource('/events'),
        req1 = http.request(
            { method: "POST", path: "/testevent/message?a=1&b=2&c=3" }
        ),
        req2 = http.request(
            { method: "POST", path: "/testevent/blah?a=abc&b=def&c=ghi" }
        ),
        expected = 3;

    function all() {
        expected -= 1;
        if (expected === 0) {
            done();
        } else if (expected === 1) {
            es.close();
        }
    }

    function testMessageEvent(evt) {
        var data = JSON.parse(evt.data);
        test(assert.strictEqual, evt.type, 'message');
        test(assert.strictEqual, data.a, '1');
        test(assert.strictEqual, data.b, '2');
        test(assert.strictEqual, data.c, '3');
        all();
    }
    function testBlahEvent(evt) {
        var data = JSON.parse(evt.data);
        test(assert.strictEqual, evt.type, 'blah');
        test(assert.strictEqual, data.a, 'abc');
        test(assert.strictEqual, data.b, 'def');
        test(assert.strictEqual, data.c, 'ghi');
        all();
    }
    function testOpenEvent(evt) {
        test(assert.strictEqual, evt.type, 'open');
        // fire the events
        req1.end();
        req2.end();
        all();
    }

    es.on('open', testOpenEvent);
    es.on('message', testMessageEvent);
    es.on('blah', testBlahEvent);

}