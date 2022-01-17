function() {
            if (!this._maker) {
                this._maker = new Y.mojito.RouteMaker(this.routeConfig);
            }
            return this._maker;
        }