function () {
      this.modalview.hide();
      this.modalview.off();
      this.container.find('*').off();
      this.container.html('');

      // onClose callback
      this.options.onClose.call(this);
    }