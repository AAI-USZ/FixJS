function() {
            if (!this.maker) {
                this.maker = new Y.mojito.RouteMaker(this.routeConfig);
            }
            return this.maker;
        }