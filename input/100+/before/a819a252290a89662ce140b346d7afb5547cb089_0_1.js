function(styles) {
      var colors = this.__getColors();
      var startColor = colors.start;
      var endColor = colors.end;

      var unit = this.getColorPositionUnit();

      // new implementation for webkit is available since chrome 10 --> version
      if (qx.core.Environment.get("css.gradient.legacywebkit")) {
        // webkit uses px values if non are given
        unit = unit === "px" ? "" : unit;

        if (this.getOrientation() == "horizontal") {
          var startPos = this.getStartColorPosition() + unit +" 0" + unit;
          var endPos = this.getEndColorPosition() + unit + " 0" + unit;
        } else {
          var startPos = "0" + unit + " " + this.getStartColorPosition() + unit;
          var endPos = "0" + unit +" " + this.getEndColorPosition() + unit;
        }

        var color =
          "from(" + startColor +
          "),to(" + endColor + ")";

        var value = "-webkit-gradient(linear," + startPos + "," + endPos + "," + color + ")";
        styles["background"] = value;

      } else if (qx.core.Environment.get("css.gradient.filter") &&
        !qx.core.Environment.get("css.gradient.linear")) {

        // make sure the overflow is hidden for border radius usage [BUG #6318]
        styles["overflow"] = "hidden";
      // spec like syntax
      } else {
        var deg = this.getOrientation() == "horizontal" ? 0 : 270;
        // Bugfix for IE10 which seems to use the deg values wrong [BUG #6513]
        if (qx.core.Environment.get("browser.name") == "ie") {
          deg = deg - 90;
        }
        var start = startColor + " " + this.getStartColorPosition() + unit;
        var end = endColor + " " + this.getEndColorPosition() + unit;

        var prefixedName = qx.core.Environment.get("css.gradient.linear");
        styles["background-image"] =
          prefixedName + "(" + deg + "deg, " + start + "," + end + ")";
      }
    }