function(component) {
        var type;
        type = component.get("type");
        _this.g2d.save();
        _this.drawers[type].paint(component);
        return _this.g2d.restore();
      }