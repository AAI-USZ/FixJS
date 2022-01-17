function() {
      var panes;
      this.wrap.find('.padding').append(this.content);
      this.wrap.css({
        display: "block",
        position: "absolute",
        "min-height": 118
      });
      panes = this.getPanes();
      panes.overlayImage.appendChild(this.wrap[0]);
      this.iWidth = this.wrap.outerWidth();
      this.iHeight = this.wrap.outerHeight();
      return this.bindButton();
    }