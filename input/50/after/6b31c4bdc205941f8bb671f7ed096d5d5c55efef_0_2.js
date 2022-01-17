function() {
        before();
        handlers.error({msg: 'error'});
        assert.equal(1, UI.messages.length);
        assert.includes(UI.messages, 'error');
    }