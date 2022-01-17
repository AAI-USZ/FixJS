function (x, y) {
            return this.cubes.getFromIntersect(
                this.getIntersectBetween(x, y, this.cubes.wireframes())
            );
        }