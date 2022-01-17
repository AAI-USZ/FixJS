function(e) {
        e.preventDefault();
        settings.get('fields').add(this.model.clone());
        this.$el.modal('hide');
      }