function () {
            this.on('item:click', this._updateDistricts, this);
            REIN.events.on('filter:area', this._clearDistricts, this);
        }