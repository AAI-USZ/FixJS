function hk_render(layout_type) {
    switch (layout_type) {
      case 'oncall':
        this.phoneNumberViewContainer.classList.add('keypad-visible');
        if (this.callBar) {
          this.callBar.classList.add('hide');
        }
        this.deleteButton.classList.add('hide');
        this.hideBar.classList.remove('hide');
        break;
      default:
        this.phoneNumberViewContainer.classList.remove('keypad-visible');
        if (this.hideBar)
          this.hideBar.classList.add('hide');

        if (this.callBar)
          this.callBar.classList.remove('hide');

        this.deleteButton.classList.remove('hide');
        break;
    }
  }