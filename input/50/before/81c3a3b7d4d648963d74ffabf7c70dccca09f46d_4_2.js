function(event) {
      event.preventDefault();
      this.layoutView.trigger('applyEdits');
    }