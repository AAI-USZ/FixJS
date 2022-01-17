function() {
      componentGroup.bind('add', this.addComponent, this);
      componentGroup.bind('reset', this.addAllComponents, this);

      this.bind('closePopover', this.resetActiveElement, this);
      this.bind('applyEdits', this.applyEdits, this);
      this.bind('removeElement', this.removeElement, this);
    }