function (areaId) {
            this._clearExistingViews();
            this._currentCollection = _.filter(this.collection, function (owner) {
                return owner.area === areaId;
            });
        }