function(element, options) {

    var self = this,

        $element = $(element),

        _hover_inited = false;

    

    if (element.combobox != undefined) {

      return false;

    }

    

    element.combobox = self;

    

    self.options = options;

    self.element = element;

    self.$element = $element;

    self.multiple = element.multiple;

    

    //create new elements and make link to the object on it

    (self._list = (self.list = $('<ul class="' + self.options.classes.list + (self.multiple ? ' ' + self.options.classes.multiple : '') + '" />')).get(0)).combobox = self;

    

    if (!self.multiple) {

      (self._wrapper = (self.wrapper = $('<div class="' + self.options.classes.wrapper + '" />')).get(0)).combobox = self;

      (self._selected = (self.selected = $('<div class="' + self.options.classes.selected + '" />')).get(0)).combobox = self;

      (self._button = (self.button = $('<div class="' + self.options.classes.button + '">+</div>')).get(0)).combobox = self;

    }

    

    //bind select events

    self.$element.bind('change', function(e) {

      self.updateSelected();

    }).bind('focus', function(e) {

      self.focus();

    }).bind('blur', function(e) {

      self.blur();

    }).bind('keypress', function(e){

      switch(e.which) {

        case 38:

        case 40:

          self.updateSelected();

          break;

      }

    });

    

    var _form = self.element.form;

    if (_form !== null && _form.combobox_reset_processed === undefined) {

      _form.combobox_reset_processed = true;

      $(_form).bind('reset', function(e) {

        setTimeout(function(){

          $.each(_form.elements, function() {

            if (this.tagName == 'SELECT' && typeof(this.combobox) != 'undefined') {

              this.combobox.updateSelected();

            }

          });

        }, 1);

      });

    }

    

    if (!self.multiple) {

      self.wrapper.bind('click', function(e) {

        if (self.isDisabled()) {

          return false

        }

        if (self.blocked) {

          return false;

        }

        if (self.state) {

          self.hide();

        }

        else {

          if (!_hover_inited) {

            _hover_inited = true;

            //hide droplist when cursor is going outside

            self.list.add(self.button).add(self.selected).hover(function(e) {

              clearTimeout(self.timer);

            }, function(e) {

              self.timer = setTimeout(function() {

                self.hide();

              }, 400);

            });

          }

          self.show();

        }

        self.focus();

        return false;

      }).bind('keydown', function(e){

        var $options = self.$element.find('option'),

            index = $options.index($options.filter(':selected'));

        switch(e.which) {

          case 38:

            if (index > 0) {

              $options.eq(index - 1).attr('selected', 'selected');

              self.$element.change();

            }

            break;

          case 40:

            if (index < $options.length) {

              $options.eq(index + 1).attr('selected', 'selected');

              self.$element.change();

            }

            break;

        }

      }).bind('focus', function(e){//TODO

         self.focus();

      }).bind('blur', function(e){

         self.blur();

      });

    }

    else {

      self.list.bind('keydown', function(e){

        var $options = self.$element.find('option'),

            ctrl  = e.ctrlKey || e.metaKey,

            index;

        switch(e.which) {

          case 38:

            index = $options.index($options.filter(':selected').first());

            index = index == -1 ? 1 : index;

            index = (index > $options.length - 1) ? $options.length - 1 : index;

            if (!ctrl) {

              $options.attr('selected', null);

            }

            $options.eq(index - 1).attr('selected', 'selected');

            self.$element.change();

            break;

          case 40:

            index = $options.index($options.filter(':selected').last());

            index = index == -1 ? -1 : index;

            index = (index >= $options.length - 1) ? -1 : index;

            if (!ctrl) {

              $options.attr('selected', null);

            }

            $options.eq(index + 1).attr('selected', 'selected');

            self.$element.change();

            break;

        }

      });

    }

    

    if (self.options.hoverEnabled && !self.multiple) {

      self.wrapper.hover(function() {

        self.wrapper.addClass(self.options.classes.wrapHover);

      }, function() {

        //todo - check lines above - it could be problems here (class will not remove)

        if (!self.blocked && !self.state) {

          self.wrapper.removeClass(self.options.classes.wrapHover);

        }

      });

    }



    //collect select styles

    self.width  = (self.options.width  ? self.options.width  : self.$element.outerWidth());

    self.height = (self.options.height ? self.options.height : self.$element.outerHeight());

    self.btnWidth = (self.options.btnWidth);

    

    if (self.options.adjustWidth && self.btnWidth > 20) {

      switch(typeof(self.options.adjustWidth)) {

        case 'boolean':

          self.width = self.width + self.options.btnWidth - 20;

          break;

        case 'number':

          self.width = self.width + self.options.adjustWidth;

          break;

      }

    }

    

    var display = $.browser.msie && $.browser.version.match(/^\d+/)[0] < 8 ? 'inline' : 'inline-block';

    

    if (!self.multiple) {

      self.wrapper.css({

        display: display,

        width: self.width,

        height: self.height

      }).attr('tabindex', 0);

      self.button.css({

        width: self.btnWidth,

        height: self.height,

        display: 'inline-block'

      });

      self.selected.css({

        width: self.width - self.btnWidth,

        height: self.height,

        display: 'inline-block'

      });

      self.list.css({

        width: self.width,

        position: 'absolute'

      });

    }

    else {

      self._list.style.display = display;

      self._list.style.width = self.width + 'px';

      self.list.attr('tabindex', 0);

    }

    

    if (!self.multiple) {

      self.wrapper.append(self.button);

      self.wrapper.append(self.selected);

      self.wrapper.insertAfter(self.$element);

    }

    else {

      self.list.insertAfter(self.$element);

    }

    

    //init

    self.updateDisabled();

    self.rebuild();

    self.updateSelected();

    

    if (!self.multiple) {

      self._list.style.display = 'none';

      $('body').append(self.list);

    }

    self.$element.hide().trigger('combo_init');

  }