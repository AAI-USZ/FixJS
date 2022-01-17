function() {
      var _this = this;
      this.title = $("<div>");
      this.body = $("<div>");
      this.content = $("<div>").addClass("map-infowindow-content");
      this.content.append(this.title);
      this.content.append(this.body);
      this.content.css({
        background: "white",
        padding: "10px",
        margin: "0 0 0 15px"
      });
      this.content.hover(function(e) {
        return _this.isMouseover = true;
      }, function(e) {
        return _this.isMouseover = false;
      });
      return this.infoBox.setContent(this.content.get(0));
    }