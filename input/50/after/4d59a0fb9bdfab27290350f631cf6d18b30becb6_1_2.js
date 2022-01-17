function(highlighted) {
      this.highlighted = highlighted;
      this.updateIcons();
      return komoo.event.trigger(this, 'highlight_changed', this.highlighted);
    }