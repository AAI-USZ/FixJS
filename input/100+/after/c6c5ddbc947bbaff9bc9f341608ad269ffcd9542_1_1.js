function(e) {
      var horizontal = this.getDirection() == "horizontal";

      var overall;
      var bar;
      var tapPos;
      var mod;

      var elemPos = lowland.bom.Element.getLocation(this.getElement());

      if (horizontal) {
        overall = this.getPositionInfo().width;
        bar = this.getChildControl("bar").getPositionInfo().width;
        mod = Math.round((bar - overall) / 2);

        tapPos = e.touches[0].pageX /* e.getViewportLeft() */ - elemPos.left + mod;
      } else {
        overall = this.getPositionInfo().height;
        bar = this.getChildControl("bar").getPositionInfo().height;
        mod = Math.round((bar - overall) / 2);

        tapPos = e.touches[0].pageY /* e.getViewportTop() */ - elemPos.top + mod;
      }

      if (tapPos < 0) {
        tapPos = 0;
      } else if (tapPos > bar) {
        tapPos = bar;
      }

      this.fireEvent("clickOnBar", { tapValue: tapPos / bar, tapInfo: e.touches[0] });
    }