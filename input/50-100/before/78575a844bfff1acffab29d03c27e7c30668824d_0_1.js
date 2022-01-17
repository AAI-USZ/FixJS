function() {
      this.shadowleft.css({
        right: this.shadowleft.parent().width() / 2 + 63
      });
      this.shadowright.css({
        left: this.shadowright.parent().width() / 2 + 64
      });
      return this.tapebox.css({
        left: this.tapebox.parent().width() / 2 - 62
      });
    }