function(e) {
        _this.cursor.hide();
        jQuery(document.elementFromPoint(e.clientX, e.clientY)).trigger('click');
        _this.cursor.show();
        return false;
      }