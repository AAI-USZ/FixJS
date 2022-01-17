function(e) {
      var horizontal = this.getDirection() == "horizontal";
      
      var overall;
      var bar;
      var clickedPos;
      var mod;
      
      var elemPos = lowland.bom.Element.getLocation(this.getElement());
      
      if (horizontal) {
        overall = this.getPositionInfo().width;
        bar = this.getChildControl("bar").getPositionInfo().width;
        mod = Math.round((bar - overall) / 2);
        
        
        clickedPos = e.getViewportLeft() - elemPos.left + mod;
      } else {
        overall = this.getPositionInfo().height;
        bar = this.getChildControl("bar").getPositionInfo().height;
        mod = Math.round((bar - overall) / 2);
        
        clickedPos = e.getViewportTop() - elemPos.top + mod;
      }

      if (clickedPos < 0) {
        clickedPos = 0;
      } else if (clickedPos > bar) {
        clickedPos = bar;
      }
      
      this.fireEvent("clickOnBar", clickedPos / bar);
    }