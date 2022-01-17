function Modalbox() {
      this.close = __bind(this.close, this);
      this.modal = $('<div class="modal"><div class="padding"></div></div>');
      this.overlay = $('<span class="overlay"></span>');
      $('body').append(this.modal);
      $('body').append(this.overlay);
      this.overlay.bind('click', this.close);
    }