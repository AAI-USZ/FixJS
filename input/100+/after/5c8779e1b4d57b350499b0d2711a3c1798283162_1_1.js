function() {
      var _this = this;
      this._fixConsole();
      this.element.addClass('sizedetect-container ui-widget-content');
      this._savedCSS = {
        position: this.element.css('position'),
        top: this.element.css('top'),
        bottom: this.element.css('bottom'),
        left: this.element.css('left'),
        right: this.element.css('right'),
        'z-index': this.element.css('z-index'),
        'background-color': this.element.css('background-color')
      };
      this.element.css({
        position: 'fixed',
        top: '5px',
        bottom: '5px',
        left: '5px',
        right: '5px',
        'z-index': 100
      });
      this.element.append("<div class='progressBar'></div>");
      this.progressBar = this.element.find(".progressBar");
      this.progressBar.css({
        'float': 'right',
        'width': '50%'
      });
      this.progressBar.progressbar();
      this.element.append("<button class='catchme'><img src='" + this.options.rootPrefix + "aron.png'/></button>");
      this.catchme = this.element.find('.catchme');
      this.console.info(this.catchme.button());
      this.catchme.find('.ui-button-text').css({
        'padding': 0
      });
      this.catchme.click(function(e) {
        e.stopPropagation();
        return _this._attempt(true);
      });
      this.catchme.css({
        cursor: "url(" + this.options.rootPrefix + "blank.cur), none"
      });
      this.element.css({
        cursor: "url(" + this.options.rootPrefix + "blank.cur), none"
      });
      this.element.append("<img class='custom-cursor' src='" + this.options.rootPrefix + "futter.png'/>");
      this.cursor = jQuery('.custom-cursor', this.element);
      this.cursor.css({
        position: 'absolute',
        top: 0,
        left: 0,
        'z-index': 10000,
        'pointer-events': 'none'
      });
      this.cursor.click(function(e) {
        _this.cursor.hide();
        console.info(e);
        jQuery(document.elementFromPoint(e.clientX, e.clientY)).trigger('click');
        _.defer(function() {
          return _this.cursor.show();
        });
        return false;
      });
      this.element.mouseout(function(e) {
        console.info('element out', 'e', e, 'e.relatedTarget', e.relatedTarget);
        if (!_this.catchme.has(e.relatedTarget)) {
          _this.cursor.hide();
        }
        return false;
      });
      this.element.mouseenter(function(e) {
        console.info('element enter', e);
        _this.cursor.show();
        return false;
      });
      this.element.mousemove(function(e) {
        console.info('element move');
        return _this.cursor.css({
          left: e.clientX - (_this.cursorsize / 2),
          top: e.clientY - (_this.cursorsize / 2)
        });
      });
      this.element.click(function(e) {
        return _this._attempt(false);
      });
      jQuery('body').bind('keyup', {
        widget: this
      }, this._escHandler);
      this.element.mousemove(function(e) {
        if (_this.notyetmoved) {
          _this.notyetmoved = false;
          _this.reactionTime = _this.reactionTimer.end();
          return _this.moveTimer.start();
        }
      });
      this.element.append('<div id="moveTime"></div>');
      this.element.append('<div id="reactionTime"></div>');
      this.details = {};
      this.moveTimer = new StopWatch;
      this.reactionTimer = new StopWatch;
      this.moveTimeStat = new Stat;
      this.reactionTimeStat = new Stat;
      return this._beginGame();
    }