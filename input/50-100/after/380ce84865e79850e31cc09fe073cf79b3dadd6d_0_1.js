function(e) {
        e.preventDefault();
        this.$('.delete-confirm').button('loading');
        return app.vent.trigger('task:delete', this.model.id);
      }