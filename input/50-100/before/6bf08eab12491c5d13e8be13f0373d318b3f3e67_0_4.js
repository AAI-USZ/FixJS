function() {
    if (this.isDestroying) { return; }

    this.invokeRecursively(function(view) {
      view.propertyDidChange('collectionView');
      view.propertyDidChange('itemView');
      view.propertyDidChange('contentView');
    });

    if (getPath(this, 'parentView.controller') && !get(this, 'controller')) {
      this.notifyPropertyChange('controller');
    }
  }