function() {
      var that;
      that = this;
      this.title = $("<div>");
      this.body = $("<div>");
      this.content = $("<div>").addClass("map-infowindow-content");
      this.content.append(this.title);
      this.content.append(this.body);
      this.content.css({
        background: "white"
      });
      ({
        padding: "10px",
        margin: "0 0 0 15px"
      });
      this.content.hover(function(e) {
        return that.isMouseover = true;
      }, function(e) {
        return that.isMouseover = false;
      });
      return this.infoBox.setContent(this.content.get(0));
    }