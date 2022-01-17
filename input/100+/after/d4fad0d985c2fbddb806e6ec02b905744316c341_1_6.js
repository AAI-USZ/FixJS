function() {
        var hoverclass, id, _base, _ref,
          _this = this;
        if ((_ref = (_base = this.options).icon) == null) {
          _base.icon = "icon-" + (this.options.label.toLowerCase());
        }
        id = "" + this.options.uuid + "-" + this.options.label;
        this.button = this._createButton(id, this.options.command, this.options.label, this.options.icon);
        this.element.append(this.button);
        if (this.options.cssClass) {
          this.button.addClass(this.options.cssClass);
        }
        if (this.options.editable.options.touchScreen) {
          this.button.addClass('btn-large');
        }
        this.button.data('hallo-command', this.options.command);
        hoverclass = 'ui-state-hover';
        this.button.bind('mouseenter', function(event) {
          if (_this.isEnabled()) {
            return _this.button.addClass(hoverclass);
          }
        });
        return this.button.bind('mouseleave', function(event) {
          return _this.button.removeClass(hoverclass);
        });
      }