function (districts) {
            var hits = this.collection.filter(function (o) {
                return _.indexOf(districts, o.district) > -1;
            });
            this._currentHits.reset(hits);
        }