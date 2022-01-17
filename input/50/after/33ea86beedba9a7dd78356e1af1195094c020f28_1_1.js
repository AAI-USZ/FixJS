function() {
        assert.equals(['Name is required'], this.model.validate({name:''}));
    }