function() {
        before();
        handlers.error({msg: 'error'});
        assert.length(UI.messages, 1);
        assert.includes(UI.messages, 'error');
    }