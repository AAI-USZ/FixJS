function(manage) {
        // Iterate over the passed collection and insert into the view
        this.collection.each(function(model) {
          this.insertView("ul", new setup.ItemView({ model: model.toJSON() }));
        }, this);

        return manage(this).render();
      }