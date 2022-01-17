function() {
      var $img, naturalHeight, naturalWidth, scale;
      ComponentView.prototype.render.call(this);
      $img = $("<img src=" + (this.model.get('src')) + "></img>");
      if (this.model.get("imageType") === "SVG") {
        $img.css({
          width: "100%",
          height: "100%"
        });
        naturalWidth = $img[0].naturalWidth;
        naturalHeight = $img[0].naturalHeight;
        scale = this.model.get("scale");
        if (scale) {
          this.$el.css({
            width: scale.width,
            height: scale.height
          });
        } else {
          this.$el.css({
            width: naturalWidth,
            height: naturalHeight
          });
          this.model.set("scale", {
            width: naturalWidth,
            height: naturalHeight
          });
        }
      }
      $img.bind("dragstart", function(e) {
        e.preventDefault();
        return false;
      });
      this.$el.find(".content").append($img);
      this.$el.css({
        top: this.model.get("y"),
        left: this.model.get("x")
      });
      return this.$el;
    }