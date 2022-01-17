function CustomInfoWindow(marker, content, opts) {
      this.handleSave = __bind(this.handleSave, this);

      this.toggleShare = __bind(this.toggleShare, this);

      this.toggleEditMod = __bind(this.toggleEditMod, this);

      this.open = __bind(this.open, this);

      this.close = __bind(this.close, this);

      var wrap;
      this.content = content;
      this.marker = marker;
      this.template = opts.template;
      this.map = marker.map;
      wrap = "<div class=\"customInfoWindow\">\n  <a href=\"javascript:\" title=\"Close\" class=\"close button\"></a>\n    <div class=\"padding\"></div>\n</div>";
      this.wrap = $(wrap);
      this.closeBtn = this.wrap.find('.close');
      this.setMap(this.map);
      this.isVisible = false;
      this.onClose = opts.onClose;
      this.onOpen = opts.onOpen;
      this.onSave = opts.onSave;
      this.closeBtn.bind('click', this.close);
    }