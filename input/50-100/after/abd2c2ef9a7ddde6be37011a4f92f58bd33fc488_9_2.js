function(position, range) {

        var area = range || this.grid.get("size"),
            target,
            distance;

        for (var c in this.units) {
            
            if (!this.units.hasOwnProperty(c) ) {
                continue;
            }
            
            target = this.units[c].get("position");
            
            distance = findDistance(position, target);

            if (distance < area) {
                return this.units[c];
            }

        }

    }