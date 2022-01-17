function() {
        var id, _base, _ref;
        if ((_ref = (_base = this.options).icon) == null) {
          _base.icon = "icon-" + (this.options.label.toLowerCase());
        }
        id = "" + this.options.uuid + "-" + this.options.label;
        this.element.append(this._createButton(id, this.options.command));
        this.element.append(this._createLabel(id, this.options.command, this.options.label, this.options.icon));
        if (this.options.cssClass) {
          this.element.find('label').addClass(this.options.cssClass);
        }
        this.button = this.element.find('input');
        this.button.button();
        if (this.options.cssClass) {
          this.button.addClass(this.options.cssClass);
        }
        if (this.options.editable.options.touchScreen) {
          this.button.addClass('btn-large');
        }
        return this.button.data('hallo-command', this.options.command);
      }