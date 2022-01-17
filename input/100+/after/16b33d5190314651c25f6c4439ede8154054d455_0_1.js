function() {
      var contentClass, cssRule, options, paneClass, sliderClass;
      options = this.options;
      paneClass = options.paneClass, sliderClass = options.sliderClass, contentClass = options.contentClass;
      if (this.$el.find("" + paneClass).length === 0 && this.$el.find("" + sliderClass).length === 0) {
        this.$el.append("<div class=\"" + paneClass + "\"><div class=\"" + sliderClass + "\" /></div>");
      }
      this.content = this.$el.children("." + contentClass);
      this.content.attr('tabindex', 0);
      this.slider = this.$el.find("." + sliderClass);
      this.pane = this.$el.find("." + paneClass);
      if (BROWSER_SCROLLBAR_WIDTH) {
        cssRule = {
          right: -BROWSER_SCROLLBAR_WIDTH
        };
        this.$el.addClass('has-scrollbar');
      }
      if (options.iOSNativeScrolling) {
        if (cssRule == null) {
          cssRule = {};
        }
        cssRule.WebkitOverflowScrolling = 'touch';
      }
      if (cssRule != null) {
        this.content.css(cssRule);
      }
      if (options.alwaysVisible) {
        this.pane.css({
          opacity: 1,
          visibility: 'visible'
        });
      }
      return this;
    }