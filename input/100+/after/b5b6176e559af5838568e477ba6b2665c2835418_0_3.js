function (enable, districtId) {
            if (arguments.length < 2) {
                return this._activeDistricts;
            }
            var districtIndex = _.indexOf(this._activeDistricts, districtId);
            if (enable  && districtIndex < 0) {
                this._activeDistricts.push(districtId);
            }
            if (!enable && districtIndex > -1) {
                this._activeDistricts = _.without(this._activeDistricts, districtId);
            }
            REIN.events.trigger('filter:districts', this._activeDistricts);
        }