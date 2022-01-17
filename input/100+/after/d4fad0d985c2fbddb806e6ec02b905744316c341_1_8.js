function(jQuery) {
    jQuery.widget('IKS.hallobutton', {
      button: null,
      isChecked: false,
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
      },
      _init: function() {
        var editableElement, queryState,
          _this = this;
        if (!this.button) {
          this.button = this._prepareButton();
        }
        this.element.append(this.button);
        queryState = function(event) {
          if (!_this.options.command) {
            return;
          }
          try {
            return _this.checked(document.queryCommandState(_this.options.command));
          } catch (e) {

          }
        };
        if (this.options.command) {
          this.button.bind('click', function(event) {
            _this.options.editable.execute(_this.options.command);
            queryState;

            return false;
          });
        }
        if (!this.options.queryState) {
          return;
        }
        editableElement = this.options.editable.element;
        editableElement.bind('keyup paste change mouseup hallomodified', queryState);
        editableElement.bind('halloenabled', function() {
          return editableElement.bind('keyup paste change mouseup hallomodified', queryState);
        });
        return editableElement.bind('hallodisabled', function() {
          return editableElement.unbind('keyup paste change mouseup hallomodified', queryState);
        });
      },
      enable: function() {
        return this.button.removeAttr('disabled');
      },
      disable: function() {
        return this.button.attr('disabled', 'true');
      },
      isEnabled: function() {
        return this.button.attr('disabled') !== 'true';
      },
      refresh: function() {
        if (this.isChecked) {
          return this.button.addClass('ui-state-active');
        } else {
          return this.button.removeClass('ui-state-active');
        }
      },
      checked: function(checked) {
        this.isChecked = checked;
        return this.refresh();
      },
      _createButton: function(id, command, label, icon) {
        return jQuery("<button for=\"" + id + "\" class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only " + command + "_button\" title=\"" + label + "\"><span class=\"ui-button-text\"><i class=\"" + icon + "\"></i></span></button>");
      }
    });
    return jQuery.widget('IKS.hallobuttonset', {
      buttons: null,
      _create: function() {
        return this.element.addClass('ui-buttonset');
      },
      _init: function() {
        return this.refresh();
      },
      refresh: function() {
        var rtl;
        rtl = this.element.css('direction') === 'rtl';
        this.buttons = this.element.find('.ui-button');
        this.buttons.hallobutton('refresh');
        this.buttons.removeClass('ui-corner-all ui-corner-left ui-corner-right');
        this.buttons.filter(':first').addClass(rtl ? 'ui-corner-right' : 'ui-corner-left');
        return this.buttons.filter(':last').addClass(rtl ? 'ui-corner-left' : 'ui-corner-right');
      }
    });
  }