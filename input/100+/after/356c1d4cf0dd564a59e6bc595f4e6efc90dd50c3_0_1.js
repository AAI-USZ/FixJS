function() {
      var oL, oT, offset, opts, position;
      position = this.options.position;
      opts = POSITION_MAPPING[position];
      oT = +this.options.offsetTop;
      oL = +this.options.offsetLeft;
      switch (position) {
        case 'topCenter':
          offset = "" + oL + " -" + (oT + this.dimensions.outerHeight);
          break;
        case 'bottomCenter':
        case 'bottomLeft':
          offset = "" + oL + " " + (oT + this.dimensions.outerHeight);
          break;
        case 'leftCenter':
          offset = "-" + oL + " " + oT;
          break;
        default:
          offset = "" + oL + " " + oT;
      }
      $.extend(opts, {
        of: this.$el,
        offset: offset,
        collision: 'none'
      });
      this.$tooltip.position(opts);
      this.$tooltip.css({
        width: this.dimensions.width,
        height: this.dimensions.height
      });
      return $(this.$tooltip.children()[0]).css({
        position: 'absolute'
      });
    }