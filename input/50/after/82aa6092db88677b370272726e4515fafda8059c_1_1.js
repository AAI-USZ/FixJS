function(cb) {
            return PostRes.update({id: this._id},
                angular.extend({}, this, {_id:undefined}), cb);
        }