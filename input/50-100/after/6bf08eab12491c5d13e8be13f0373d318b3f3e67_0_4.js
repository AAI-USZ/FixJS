function() {
    if (this.isDestroying) { return; }

    this.invokeRecursively(function(view) {
      view.propertyDidChange('collectionView');
      view.propertyDidChange('itemView');
      view.propertyDidChange('contentView');
    });

    if (get(this, 'parentView.controller') && !get(this, 'controller')) {
      this.notifyPropertyChange('controller');
    }
  }