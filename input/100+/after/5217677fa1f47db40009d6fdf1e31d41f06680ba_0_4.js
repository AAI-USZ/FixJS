function MapDot(smallimap, x, y, landiness) {
        this.smallimap = smallimap;
        this.x = x;
        this.y = y;
        this.landiness = landiness;
        this.setColor = __bind(this.setColor, this);

        this.setRadius = __bind(this.setRadius, this);

        this.target = {};
        this.dirty = true;
        this.initial = {
          color: new Color("#333"),
          radius: this.smallimap.radiusFor(this.smallimap.xToLong(this.x), this.smallimap.yToLat(this.y), this.landiness)
        };
      }