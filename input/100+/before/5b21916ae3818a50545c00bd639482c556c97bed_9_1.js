function($img) {
      var height, naturalHeight, naturalWidth, scale, width;
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
          width = Math.max(naturalWidth, 50);
          height = Math.max(naturalHeight, 50);
          this.$el.css({
            width: width,
            height: height
          });
          this.model.set("scale", {
            width: width,
            height: height
          });
        }
      }
      $img.bind("dragstart", function(e) {
        e.preventDefault();
        return false;
      });
      this.$el.find(".content").append($img);
      return this.$el.css({
        top: this.model.get("y"),
        left: this.model.get("x")
      });
    }