function(after_out) {
      var animate;
      animate = !this.the.config.enable_auto_transitions;
      animate || (animate = this.the.config.disable_transitions);
      if (animate) {
        return typeof after_out === "function" ? after_out() : void 0;
      } else {
        return this.el.animate({
          opacity: 0
        }, 300, after_out);
      }
    }