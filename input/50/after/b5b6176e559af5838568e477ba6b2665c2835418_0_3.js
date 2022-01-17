function (areaId) {
            this._currentHits.reset(this.collection.filter(function (o) {
                return o.area === areaId;
            }), {silent: true});
            this._clearExistingViews();
        }