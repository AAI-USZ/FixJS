function(component) {
        var drawer, type;
        type = component.get("type");
        drawer = _this.drawers[type];
        if (drawer != null) {
          _this.g2d.save();
          drawer.paint(component);
          return _this.g2d.restore();
        }
      }