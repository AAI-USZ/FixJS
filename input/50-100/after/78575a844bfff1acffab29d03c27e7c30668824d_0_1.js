function() {
      this.shadowleft.css({
        right: this.shadowleft.parent().width() / 2 + 63
      });
      return this.shadowright.css({
        left: this.shadowright.parent().width() / 2 + 64
      });
    }