function() {
      var newHeight, newWidth, obj, scale, transformStr;
      transformStr = this.buildTransformString();
      obj = {
        transform: transformStr
      };
      obj[window.browserPrefix + "transform"] = transformStr;
      this.$content.css(obj);
      scale = this.model.get("scale");
      if (this.origSize != null) {
        newWidth = scale.width || this.origSize.width;
        newHeight = scale.height || this.origSize.height;
        this.$el.css({
          width: newWidth,
          height: newHeight
        });
      }
      if (scale != null) {
        this.$contentScale.css(window.browserPrefix + "transform", "scale(" + scale.x + "," + scale.y + ")");
      }
      return this.$el.css(window.browserPrefix + "transform", "rotate(" + this.model.get("rotate") + "rad)");
    }