function() {
      componentGroup.bind('add', this.addComponent, this);
      componentGroup.bind('reset', this.addAllComponents, this);

      this.bind('closePopover', this.resetActiveElement, this);
      this.bind('applyComponentConfig', this.applyComponentConfig, this);
      this.bind('applyElementEdits', this.applyElementEdits, this);
      this.bind('removeElement', this.removeElement, this);
    }