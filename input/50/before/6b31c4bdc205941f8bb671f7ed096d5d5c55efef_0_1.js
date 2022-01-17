function() {
        before();
        assert.length(socket.sent, 1);
        assert.includes(socket.sent, 'available');
    }