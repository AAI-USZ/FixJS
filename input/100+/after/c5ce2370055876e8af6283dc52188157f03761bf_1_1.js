function(jQuery) {
    return jQuery.widget("IKS.hallo", {
      toolbar: null,
      bound: false,
      originalContent: "",
      previousContent: "",
      uuid: "",
      selection: null,
      _keepActivated: false,
      originalHref: null,
      options: {
        editable: true,
        plugins: {},
        toolbar: 'halloToolbarContextual',
        parentElement: 'body',
        buttonCssClass: null,
        placeholder: '',
        forceStructured: true,
        checkTouch: true,
        touchScreen: null
      },
      _create: function() {
        var options, plugin, _ref,
          _this = this;
        this.id = this._generateUUID();
        if (this.options.checkTouch && this.options.touchScreen === null) {
          this.checkTouch();
        }
        _ref = this.options.plugins;
        for (plugin in _ref) {
          options = _ref[plugin];
          if (!jQuery.isPlainObject(options)) {
            options = {};
          }
          jQuery.extend(options, {
            editable: this,
            uuid: this.id,
            buttonCssClass: this.options.buttonCssClass
          });
          jQuery(this.element)[plugin](options);
        }
        this.element.one('halloactivated', function() {
          return _this._prepareToolbar();
        });
        return this.originalContent = this.getContents();
      },
      _init: function() {
        if (this.options.editable) {
          return this.enable();
        } else {
          return this.disable();
        }
      },
      disable: function() {
        var _this = this;
        this.element.attr("contentEditable", false);
        this.element.unbind("focus", this._activated);
        this.element.unbind("blur", this._deactivated);
        this.element.unbind("keyup paste change", this._checkModified);
        this.element.unbind("keyup", this._keys);
        this.element.unbind("keyup mouseup", this._checkSelection);
        this.bound = false;
        jQuery(this.element).removeClass('isModified');
        this.element.parents('a').andSelf().each(function(idx, elem) {
          var element;
          element = jQuery(elem);
          if (!element.is('a')) {
            return;
          }
          if (!_this.originalHref) {
            return;
          }
          return element.attr('href', _this.originalHref);
        });
        return this._trigger("disabled", null);
      },
      enable: function() {
        var widget,
          _this = this;
        this.element.parents('a[href]').andSelf().each(function(idx, elem) {
          var element;
          element = jQuery(elem);
          if (!element.is('a[href]')) {
            return;
          }
          _this.originalHref = element.attr('href');
          return element.removeAttr('href');
        });
        this.element.attr("contentEditable", true);
        if (!this.element.html()) {
          this.element.html(this.options.placeholder);
        }
        if (!this.bound) {
          this.element.bind("focus", this, this._activated);
          this.element.bind("blur", this, this._deactivated);
          this.element.bind("keyup paste change", this, this._checkModified);
          this.element.bind("keyup", this, this._keys);
          this.element.bind("keyup mouseup", this, this._checkSelection);
          widget = this;
          this.bound = true;
        }
        if (this.options.forceStructured) {
          this._forceStructured();
        }
        return this._trigger("enabled", null);
      },
      activate: function() {
        return this.element.focus();
      },
      getSelection: function() {
        var range, userSelection;
        if (jQuery.browser.msie) {
          range = document.selection.createRange();
        } else {
          if (window.getSelection) {
            userSelection = window.getSelection();
          } else if (document.selection) {
            userSelection = document.selection.createRange();
          } else {
            throw "Your browser does not support selection handling";
          }
          if (userSelection.rangeCount > 0) {
            range = userSelection.getRangeAt(0);
          } else {
            range = userSelection;
          }
        }
        return range;
      },
      restoreSelection: function(range) {
        if (jQuery.browser.msie) {
          return range.select();
        } else {
          window.getSelection().removeAllRanges();
          return window.getSelection().addRange(range);
        }
      },
      replaceSelection: function(cb) {
        var newTextNode, r, range, sel, t;
        if (jQuery.browser.msie) {
          t = document.selection.createRange().text;
          r = document.selection.createRange();
          return r.pasteHTML(cb(t));
        } else {
          sel = window.getSelection();
          range = sel.getRangeAt(0);
          newTextNode = document.createTextNode(cb(range.extractContents()));
          range.insertNode(newTextNode);
          range.setStartAfter(newTextNode);
          sel.removeAllRanges();
          return sel.addRange(range);
        }
      },
      removeAllSelections: function() {
        if (jQuery.browser.msie) {
          return range.empty();
        } else {
          return window.getSelection().removeAllRanges();
        }
      },
      getContents: function() {
        var contentClone, plugin;
        contentClone = this.element.clone();
        for (plugin in this.options.plugins) {
          jQuery(this.element)[plugin]('cleanupContentClone', contentClone);
        }
        return contentClone.html();
      },
      setContents: function(contents) {
        return this.element.html(contents);
      },
      isModified: function() {
        if (!this.previousContent) {
          this.previousContent = this.originalContent;
        }
        return this.previousContent !== this.getContents();
      },
      setUnmodified: function() {
        return this.previousContent = this.getContents();
      },
      setModified: function() {
        jQuery(this.element).addClass('isModified');
        return this._trigger('modified', null, {
          editable: this,
          content: this.getContents()
        });
      },
      restoreOriginalContent: function() {
        return this.element.html(this.originalContent);
      },
      execute: function(command, value) {
        if (document.execCommand(command, false, value)) {
          return this.element.trigger("change");
        }
      },
      protectFocusFrom: function(el) {
        var widget;
        widget = this;
        return el.bind("mousedown", function(event) {
          event.preventDefault();
          widget._protectToolbarFocus = true;
          return setTimeout(function() {
            return widget._protectToolbarFocus = false;
          }, 300);
        });
      },
      keepActivated: function(_keepActivated) {
        this._keepActivated = _keepActivated;
      },
      _generateUUID: function() {
        var S4;
        S4 = function() {
          return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
        };
        return "" + (S4()) + (S4()) + "-" + (S4()) + "-" + (S4()) + "-" + (S4()) + "-" + (S4()) + (S4()) + (S4());
      },
      _prepareToolbar: function() {
        var plugin;
        this.toolbar = jQuery('<div class="hallotoolbar"></div>').hide();
        jQuery(this.element)[this.options.toolbar]({
          editable: this,
          parentElement: this.options.parentElement,
          toolbar: this.toolbar
        });
        for (plugin in this.options.plugins) {
          jQuery(this.element)[plugin]('populateToolbar', this.toolbar);
        }
        jQuery(this.element)[this.options.toolbar]('setPosition');
        return this.protectFocusFrom(this.toolbar);
      },
      _checkModified: function(event) {
        var widget;
        widget = event.data;
        if (widget.isModified()) {
          return widget.setModified();
        }
      },
      _keys: function(event) {
        var old, widget;
        widget = event.data;
        if (event.keyCode === 27) {
          old = widget.getContents();
          widget.restoreOriginalContent(event);
          widget._trigger("restored", null, {
            editable: widget,
            content: widget.getContents(),
            thrown: old
          });
          return widget.turnOff();
        }
      },
      _rangesEqual: function(r1, r2) {
        return r1.startContainer === r2.startContainer && r1.startOffset === r2.startOffset && r1.endContainer === r2.endContainer && r1.endOffset === r2.endOffset;
      },
      _checkSelection: function(event) {
        var widget;
        if (event.keyCode === 27) {
          return;
        }
        widget = event.data;
        return setTimeout(function() {
          var sel;
          sel = widget.getSelection();
          if (widget._isEmptySelection(sel) || widget._isEmptyRange(sel)) {
            if (widget.selection) {
              widget.selection = null;
              widget._trigger("unselected", null, {
                editable: widget,
                originalEvent: event
              });
            }
            return;
          }
          if (!widget.selection || !widget._rangesEqual(sel, widget.selection)) {
            widget.selection = sel.cloneRange();
            return widget._trigger("selected", null, {
              editable: widget,
              selection: widget.selection,
              ranges: [widget.selection],
              originalEvent: event
            });
          }
        }, 0);
      },
      _isEmptySelection: function(selection) {
        if (selection.type === "Caret") {
          return true;
        }
        return false;
      },
      _isEmptyRange: function(range) {
        if (range.collapsed) {
          return true;
        }
        if (range.isCollapsed) {
          if (typeof range.isCollapsed === 'function') {
            return range.isCollapsed();
          }
          return range.isCollapsed;
        }
        return false;
      },
      turnOn: function() {
        if (this.getContents() === this.options.placeholder) {
          this.setContents('');
        }
        jQuery(this.element).addClass('inEditMode');
        return this._trigger("activated", this);
      },
      turnOff: function() {
        jQuery(this.element).removeClass('inEditMode');
        this._trigger("deactivated", this);
        if (!this.getContents()) {
          return this.setContents(this.options.placeholder);
        }
      },
      _activated: function(event) {
        return event.data.turnOn();
      },
      _deactivated: function(event) {
        if (event.data._keepActivated) {
          return;
        }
        if (event.data._protectToolbarFocus !== true) {
          return event.data.turnOff();
        } else {
          return setTimeout(function() {
            return jQuery(event.data.element).focus();
          }, 300);
        }
      },
      _forceStructured: function(event) {
        try {
          return document.execCommand('styleWithCSS', 0, false);
        } catch (e) {
          try {
            return document.execCommand('useCSS', 0, true);
          } catch (e) {
            try {
              return document.execCommand('styleWithCSS', false, false);
            } catch (e) {

            }
          }
        }
      },
      checkTouch: function() {
        return this.options.touchScreen = !!('createTouch' in document);
      }
    });
  }