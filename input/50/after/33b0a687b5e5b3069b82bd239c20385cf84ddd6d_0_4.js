function(e) {
        // Ensure that this handler is attached once.
        // Get the point on the map that was double-clicked
        var clickPoint = MM.getMousePoint(e, this.map);
        var target = this.map.pointLocation(clickPoint);
        this.guideModel.set(target);
        return MM.cancelEvent(e);
      }