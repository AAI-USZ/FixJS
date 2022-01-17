function(jQuery) {
    return jQuery.widget('IKS.hallodropdownbutton', {
      button: null,
      options: {
        uuid: '',
        label: null,
        icon: null,
        editable: null,
        target: '',
        cssClass: null
      },
      _create: function() {
        var _base, _ref;
        return (_ref = (_base = this.options).icon) != null ? _ref : _base.icon = "icon-" + (this.options.label.toLowerCase());
      },
      _init: function() {
        var target,
          _this = this;
        target = jQuery(this.options.target);
        target.css('position', 'absolute');
        target.addClass('dropdown-menu');
        target.hide();
        if (!this.button) {
          this.button = this._prepareButton();
        }
        this.button.bind('click', function() {
          if (target.hasClass('open')) {
            _this._hideTarget();
            return;
          }
          return _this._showTarget();
        });
        target.bind('click', function() {
          return _this._hideTarget();
        });
        this.options.editable.element.bind('hallodeactivated', function() {
          return _this._hideTarget();
        });
        return this.element.append(this.button);
      },
      _showTarget: function() {
        var target;
        target = jQuery(this.options.target);
        this._updateTargetPosition();
        target.addClass('open');
        return target.show();
      },
      _hideTarget: function() {
        var target;
        target = jQuery(this.options.target);
        target.removeClass('open');
        return target.hide();
      },
      _updateTargetPosition: function() {
        var bottom, left, target, _ref;
        target = jQuery(this.options.target);
        _ref = this.element.position(), bottom = _ref.bottom, left = _ref.left;
        target.css('top', bottom);
        return target.css('left', left - 20);
      },
      _prepareButton: function() {
        var button, buttonEl, id;
        id = "" + this.options.uuid + "-" + this.options.label;
        buttonEl = jQuery("<button id=\"" + id + "\" data-toggle=\"dropdown\" data-target=\"#" + (this.options.target.attr('id')) + "\" title=\"" + this.options.label + "\">\n  <span class=\"ui-button-text\"><i class=\"" + this.options.icon + "\"></i></span>\n</button>");
        if (this.options.cssClass) {
          buttonEl.addClass(this.options.cssClass);
        }
        button = buttonEl.button();
        return button;
      }
    });
  }