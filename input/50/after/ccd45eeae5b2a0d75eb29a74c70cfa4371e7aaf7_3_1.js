function(highlighted) {
      this.highlighted = highlighted;
      this.updateIcon();
      return komoo.event.trigger(this, 'highlight_changed', this.highlighted);
    }