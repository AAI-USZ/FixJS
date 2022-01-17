function (parent, options) {
      var _defaults = {
        class_prefix: 'midgardNotifications',
        timeout: 3000,
        // Set to 0 for sticky
        auto_show: true,
        body: '',
        bindTo: null,
        gravity: 'T',
        effects: {
          onShow: function (item, cb) {
            item.animate({
              opacity: 'show'
            }, 600, cb);
          },
          onHide: function (item, cb) {
            item.animate({
              opacity: 'hide'
            }, 600, cb);
          }
        },
        actions: [],
        callbacks: {}
      };
      var _config = {};
      var _classes = {};
      var _item = null;
      var _id = null;
      var _bind_target = null;

      var _parent = parent;

      var _story = null;

      var base = {
        constructor: function (options) {
          _config = $.extend(_defaults, options || {});

          _classes = {
            container: _config.class_prefix + '-container',
            item: {
              wrapper: _config.class_prefix + '-item',
              arrow: _config.class_prefix + '-arrow',
              disregard: _config.class_prefix + '-disregard',
              content: _config.class_prefix + '-content',
              actions: _config.class_prefix + '-actions',
              action: _config.class_prefix + '-action'
            }
          };

          this._generate();
        },
        getId: function () {
          return _id;
        },
        getElement: function () {
          return _item;
        },
        _generate: function () {
          var _self = this;
          var outer, inner, content = null;

          _item = outer = jQuery('<div class="' + _classes.item.wrapper + '-outer"/>');
          outer.css({
            display: 'none'
          });
          inner = jQuery('<div class="' + _classes.item.wrapper + '-inner"/>');
          inner.appendTo(outer);

          if (_config.bindTo) {
            outer.addClass(_classes.item.wrapper + '-binded');

            var arrow = jQuery('<div class="' + _classes.item.arrow + '"/>');
            arrow.appendTo(outer);
          } else {
            outer.addClass(_classes.item.wrapper + '-normal');
          }

          content = jQuery('<div class="' + _classes.item.content + '"/>');
          content.html(_config.body);
          content.appendTo(inner);

          if (_config.actions.length) {
            var actions_holder = jQuery('<div class="' + _classes.item.actions + '"/>');
            actions_holder.appendTo(inner);
            jQuery.each(_config.actions, function (i, opts) {
              var action = jQuery('<button name="' + opts.name + '" class="button-' + opts.name + '">' + opts.label + '</button>').button();
              action.bind('click', function (e) {
                if (_story) {
                  opts.cb(e, _story, _self);
                } else {
                  opts.cb(e, _self);
                }

              });
              if (opts.className) {
                action.addClass(opts.className);
              }
              actions_holder.append(action);
            });
          }

          _item.bind('click', function (e) {
            if (_config.callbacks.onClick) {
              _config.callbacks.onClick(e, _self);
            } else {
              if (!_story) {
                _self.close();
              }
            }
          });

          if (_config.auto_show) {
            this.show();
          }

          this._setPosition();

          _id = _midgardnotifications_active.push(this);

          _parent.append(_item);
        },
        
       _calculatePositionForGravity: function (item, gravity, target, itemDimensions) {
          item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_' + gravity);
          switch (gravity) {
          case 'TL':
            return {
              left: target.left,
              top: target.top + target.height + 'px'
            };
          case 'TR':
            return {
              left: target.left + target.width - itemDimensions.width + 'px',
              top: target.top + target.height + 'px'
            };
          case 'BL':
            return {
              left: target.left + 'px',
              top: target.top - itemDimensions.height + 'px'
            };
          case 'BR':
            return {
              left: target.left + target.width - itemDimensions.width + 'px',
              top: target.top - itemDimensions.height + 'px'
            };
          case 'LT':
            return {
              left: target.left + target.width + 'px',
              top: target.top + 'px'
            };
          case 'LB':
            return {
              left: target.left + target.width + 'px',
              top: target.top + target.height - itemDimensions.height + 'px'
            };
          case 'RT':
            return {
              left: target.left - itemDimensions.width + 'px',
              top: target.top + 'px'
            };
          case 'RB':
            return {
              left: target.left - itemDimensions.width + 'px',
              top: target.top + target.height - itemDimensions.height + 'px'
            };
          case 'T':
            return {
              left: target.left + target.width / 2 - itemDimensions.width / 2 + 'px',
              top: target.top + target.height + 'px'
            };
          case 'R':
            return {
              left: target.left - itemDimensions.width + 'px',
              top: target.top + target.height / 2 - itemDimensions.height / 2 + 'px'
            };
          case 'B':
            return {
              left: target.left + target.width / 2 - itemDimensions.width / 2 + 'px',
              top: target.top - itemDimensions.height + 'px'
            };
          case 'L':
            return {
              left: target.left + target.width + 'px',
              top: target.top + target.height / 2 - itemDimensions.height / 2 + 'px'
            };
          }
        },
        
        _isFixed: function (element) {
          if (element === document) {
            return false;
          }
          if (element.css('position') === 'fixed') {
            return true;
          }
          return this._isFixed(element.offsetParent());
        },

        _setPosition: function () {
          if (_config.bindTo) {
            itemDimensions = {
              width: _item.width() ? _item.width() : 280,
              height: _item.height() ? _item.height() : 109
            };
            
            _bind_target = jQuery(_config.bindTo);
            var properties = {};
            
            var targetDimensions = {
              width: _bind_target.outerWidth(),
              height: _bind_target.outerHeight()
            };
            
            if (this._isFixed(_bind_target)) {
              properties.position = 'fixed';
              targetDimensions.left = _bind_target.offset().left;
              targetDimensions.top = _bind_target.position().top;
            } else {
              properties.position = 'absolute';
              targetDimensions.left = _bind_target.offset().left;
              targetDimensions.top = _bind_target.offset().top;
            }
            
            var pos = this._calculatePositionForGravity(_item, _config.gravity, targetDimensions, itemDimensions);
            properties.top = pos.top;
            properties.left = pos.left;

            _item.css(properties);

            return;
          }

          if (!_config.position) {
            _config.position = 'top right';
          }

          var marginTop = jQuery('.create-ui-toolbar-wrapper').outerHeight(true) + 6;
          pos = {
            position: 'fixed'
          };

          var activeHeight = function (items) {
            var total_height = 0;
            jQuery.each(items, function (i, item) {
              if (!item) {
                return;
              }
              total_height += item.getElement().height();
            });
            return total_height;
          };

          if (_config.position.match(/top/)) {
            pos.top = marginTop + activeHeight(_midgardnotifications_active) + 'px';
          }
          if (_config.position.match(/bottom/)) {
            pos.bottom = (_midgardnotifications_active.length - 1 * item.height()) + item.height() + 10 + 'px';
          }
          if (_config.position.match(/right/)) {
            pos.right = 20 + 'px';
          }
          if (_config.position.match(/left/)) {
            pos.left = 20 + 'px';
          }

          _item.css(pos);
        },
        show: function () {
          var self = this;
          var w_t, w_b, b_b, b_t, e_t, e_h;

          if (_config.callbacks.beforeShow) {
            _config.callbacks.beforeShow(self);
          }

          if (_config.bindTo) {
            var _bind_target = jQuery(_config.bindTo);
            w_t = jQuery(window).scrollTop();
            w_b = jQuery(window).scrollTop() + jQuery(window).height();
            b_t = parseFloat(_item.offset().top, 10);
            e_t = _bind_target.offset().top;
            e_h = _bind_target.outerHeight();

            if (e_t < b_t) {
              b_t = e_t;
            }

            b_b = parseFloat(_item.offset().top, 10) + _item.height();
            if ((e_t + e_h) > b_b) {
              b_b = e_t + e_h;
            }
          }

          if (_config.timeout > 0 && !_config.actions.length) {
            setTimeout(function () {
              self.close();
            }, _config.timeout);
          }

          if (_config.bindTo && (b_t < w_t || b_t > w_b) || (b_b < w_t || b_b > w_b)) {
            jQuery('html, body').stop().animate({
              scrollTop: b_t
            }, 500, 'easeInOutExpo', function () {
              _config.effects.onShow(_item, function () {
                if (_config.callbacks.afterShow) {
                  _config.callbacks.afterShow(self);
                }
              });
            });
          } else {
            _config.effects.onShow(_item, function () {
              if (_config.callbacks.afterShow) {
                _config.callbacks.afterShow(self);
              }
            });
          }
        },
        close: function () {
          var self = this;
          if (_config.callbacks.beforeClose) {
            _config.callbacks.beforeClose(self);
          }
          _config.effects.onHide(_item, function () {
            if (_config.callbacks.afterClose) {
              _config.callbacks.afterClose(self);
            }
            self.destroy();
          });
        },
        destroy: function () {
          var self = this;
          jQuery.each(_midgardnotifications_active, function (i, item) {
            if (item) {
              if (item.getId() == self.getId()) {
                delete _midgardnotifications_active[i];
              }
            }
          });
          jQuery(_item).remove();
        },
        setStory: function (story) {
          _story = story;
        },
        setName: function (name) {
          _item.addClass(_classes.item.wrapper + '-custom-' + name);
          this.name = name;
        }
      };
      base.constructor(options);
      delete base.constructor;

      return base;
    }