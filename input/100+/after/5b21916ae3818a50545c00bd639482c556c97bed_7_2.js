function() {
      this.dragScale = this.$el.parent().css(window.browserPrefix + "transform");
      this.dragScale = parseFloat(this.dragScale.substring(7, this.dragScale.indexOf(","))) || 1;
      if (!(this.origSize != null)) {
        return this.origSize = {
          width: this.$el.width(),
          height: this.$el.height()
        };
      }
    }