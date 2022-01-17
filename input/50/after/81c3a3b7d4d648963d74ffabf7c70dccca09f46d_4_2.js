function(event) {
      event.preventDefault();
      this.layoutView.trigger('applyElementEdits');
    }