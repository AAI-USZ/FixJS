function(e) {
        e.preventDefault();
        this.settings.get('fields').add(this.model.clone());
        this.$el.modal('hide');
      }