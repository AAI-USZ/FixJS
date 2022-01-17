function() {
        this.options.fetch = function(path) {
          return _.template($(path).html());
        };

        this.collection.on("reset", this.render, this);
      }