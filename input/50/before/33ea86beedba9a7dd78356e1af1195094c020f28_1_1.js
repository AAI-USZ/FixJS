function() {
        assert.equals(['name is required'], this.model.validate({name:''}));
    }