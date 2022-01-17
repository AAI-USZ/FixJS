function() {
        var rtl;
        rtl = this.element.css('direction') === 'rtl';
        this.buttons = this.element.find('.ui-button');
        this.buttons.hallobutton('refresh');
        this.buttons.removeClass('ui-corner-all ui-corner-left ui-corner-right');
        this.buttons.filter(':first').addClass(rtl ? 'ui-corner-right' : 'ui-corner-left');
        return this.buttons.filter(':last').addClass(rtl ? 'ui-corner-left' : 'ui-corner-right');
      }