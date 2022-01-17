function(jQuery) {
    return jQuery.widget('IKS.hallobutton', {
      button: null,
      options: {
        uuid: '',
        label: null,
        icon: null,
        editable: null,
        command: null,
        queryState: true,
        cssClass: null
      },
      _create: function() {
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
      },
      _init: function() {
        var editableElement, queryState,
          _this = this;
        if (!this.button) {
          this.button = this._prepareButton();
        }
        this.element.append(this.button);
        if (this.options.command) {
          this.button.bind('change', function(event) {
            return _this.options.editable.execute(_this.options.command);
          });
        }
        if (!this.options.queryState) {
          return;
        }
        editableElement = this.options.editable.element;
        queryState = function(event) {
          if (!_this.options.command) {
            return;
          }
          try {
            return _this.checked(document.queryCommandState(_this.options.command));
          } catch (e) {

          }
        };
        editableElement.bind('keyup paste change mouseup hallomodified', queryState);
        editableElement.bind('halloenabled', function() {
          return editableElement.bind('keyup paste change mouseup hallomodified', queryState);
        });
        return editableElement.bind('hallodisabled', function() {
          return editableElement.unbind('keyup paste change mouseup hallomodified', queryState);
        });
      },
      enable: function() {
        return this.button.button('enable');
      },
      disable: function() {
        return this.button.button('disable');
      },
      refresh: function() {
        return this.button.button('refresh');
      },
      checked: function(checked) {
        this.button.attr('checked', checked);
        return this.refresh();
      },
      _createButton: function(id) {
        return jQuery("<input id=\"" + id + "\" type=\"checkbox\" />");
      },
      _createLabel: function(id, command, label, icon) {
        return jQuery("<label for=\"" + id + "\" class=\"" + command + "_button\" title=\"" + label + "\"><i class=\"" + icon + "\"></i></label>");
      }
    });
  }