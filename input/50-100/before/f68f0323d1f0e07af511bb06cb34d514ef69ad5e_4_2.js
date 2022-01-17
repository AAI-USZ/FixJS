function() {
        var view = this;
        ModelBinding.bind(this);
        console.log('Saving new: ' + JSON.stringify(this.model));
        this.model.save({}, {success: function(model, response){
            namespace.app.router.navigate("/cultureList", true);
        }});

    }