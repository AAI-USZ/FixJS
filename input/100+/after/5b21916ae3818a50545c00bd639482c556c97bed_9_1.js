function($img) {
      var height, naturalHeight, naturalWidth, scale, width;
      naturalWidth = $img[0].naturalWidth;
      naturalHeight = $img[0].naturalHeight;
      if (this.model.get("imageType") === "SVG") {
        $img.css({
          width: "100%",
          height: "100%"
        });
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
      } else {
        this.origSize = {
          width: naturalWidth,
          height: naturalHeight
        };
        $img[0].width = naturalWidth;
        $img[0].height = naturalHeight;
        this._setUpdatedTransform();
      }
      $img.bind("dragstart", function(e) {
        e.preventDefault();
        return false;
      });
      this.$content.append($img);
      if (this.model.get("imageType") === "SVG") {
        $img.parent().addClass("svg");
        return $img.parent().parent().addClass("svg");
      }
    }