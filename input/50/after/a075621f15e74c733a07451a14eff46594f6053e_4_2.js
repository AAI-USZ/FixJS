function(event) {
      event.preventDefault();
      this.layoutView.trigger('applyComponentConfig', $(event.currentTarget));
    }