function(tap) {
        var target = this.map.pointLocation(new MM.Point(tap.x, tap.y));
        this.guideModel.set(target);
      }