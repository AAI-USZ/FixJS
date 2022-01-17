function(after_in) {
      var animate,
        _this = this;
      animate = !this.the.config.enable_auto_transitions;
      animate || (animate = this.the.config.disable_transitions);
      if (animate) {
        return typeof after_in === "function" ? after_in() : void 0;
      } else {
        this.el.css("opacity", 0);
        return this.el.animate({
          opacity: 1
        }, 600, function() {
          return typeof after_in === "function" ? after_in() : void 0;
        });
      }
    }