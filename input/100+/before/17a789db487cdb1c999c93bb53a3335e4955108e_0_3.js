function() {
        var _togglers = this.togglers,
            _elements = this.elements;
        _togglers.each(function(el) {
            el.setProperty('role', 'tab');
            el.setProperty('tabindex', 0);
            el.addEvents({
            'keypress': function(event) {
                if (event.code == 13) {
                    this.fireEvent('click');
                }
            },
            'focus': function() {
              this.addClass('hover');
            },
            'blur': function() {
              this.removeClass('hover');
            },
            'mouseenter': function() {
              this.addClass('hover');
            },
            'mouseleave': function() {
              this.removeClass('hover');
            }
            });
        });
        _elements.each(function(el) {
            el.setProperty('role', 'tabpanel');
            el.getParent(this.options.ariaTabListElement).setProperty('role', 'tablist');
        }, this);
    }