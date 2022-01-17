function() {
        before();
        assert.equal(1, socket.sent.length);
        assert.includes(socket.sent, 'available');
    }