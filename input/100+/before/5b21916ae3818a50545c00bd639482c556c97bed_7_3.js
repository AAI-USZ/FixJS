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
        newWidth = this.origSize.width * scale;
        newHeight = this.origSize.height * scale;
        this.$el.css({
          width: newWidth,
          height: newHeight
        });
      }
      this.$contentScale.css(window.browserPrefix + "transform", "scale(" + scale + ")");
      return this.$el.css(window.browserPrefix + "transform", "rotate(" + this.model.get("rotate") + "rad)");
    }