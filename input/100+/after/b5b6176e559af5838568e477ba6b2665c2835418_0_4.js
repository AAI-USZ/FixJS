function () {
            REIN.events.on('search', this.search, this);
            REIN.events.on('filter:area', this.filterOnArea, this);
            REIN.events.on('filter:districts', this.filterOnDistricts, this);
            this._currentHits.on('reset', this.render, this);
        }