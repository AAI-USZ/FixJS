function() {
        this.collection.each(function(model) {
          this.insertView("ul", new setup.ItemView({ model: model.toJSON() }));
        }, this);
      }