function() {
        var el, widthToAdd;
        if (this.getContents() === this.options.placeholder) {
          this.setContents('');
        }
        jQuery(this.element).addClass('inEditMode');
        if (!this.options.floating) {
          el = jQuery(this.element);
          widthToAdd = parseFloat(el.css('padding-left'));
          widthToAdd += parseFloat(el.css('padding-right'));
          widthToAdd += parseFloat(el.css('border-left-width'));
          widthToAdd += parseFloat(el.css('border-right-width'));
          widthToAdd += (parseFloat(el.css('outline-width'))) * 2;
          widthToAdd += (parseFloat(el.css('outline-offset'))) * 2;
          jQuery(this.toolbar).css("width", el.width() + widthToAdd);
        } else {
          this.toolbar.css("width", "auto");
        }
        return this._trigger("activated", this);
      }