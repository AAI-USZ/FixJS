function()
    {
        this._pins = {};

        // Events
        this.onPinAdd = new Event();
        this.onPinUpdate = new Event();
        this.onPinRemove = new Event();

        /**
         * Adds the pin, or updates it if it's already in the collection
         * @param Object pin The pin to add or update
         */
        this.addOrUpdatePin = function(pin)
        {
            var _event = null;
            if (pin.Uid in this._pins) {
                var oldPin = this._pins[pin.Uid];
                if (pin.Lat !== oldPin.Lat || pin.Lon !== oldPin.Lon) {
                    this._pins[pin.Uid] = pin.clone();
                    this.onPinUpdate.apply(this._pins[pin.Uid]);
                    
                }
            } else {
                this._pins[pin.Uid] = pin.clone();
                this.onPinAdd.apply(this._pins[pin.Uid]);
            }
        }

        /**
         * Removes the pin from the collection
         * @param  Object pin_or_uid The pin to remove, or its UID
         */
        this.removePin = function(pin_or_uid)
        {
            var pin = null;
            var uid = null;
            if (pin_or_uid instanceof Pin) {
                uid = pin_or_uid.Uid;
            } else {
                uid = pin_or_uid;
            }

            pin = this._pins[uid].clone();

            if (pin.Uid in this._pins) {
                delete this._pins[uid];
                this.onPinRemove.apply(pin);
                return true;
            } else {
                return false;
            }
        }

        /**
         * Gets the pin
         * @param  int     uid  The UID of the pin to get
         * @return Object       The pin
         */
        this.getPin = function(uid)
        {
            if (uid in this._pins) {
                return this._pins[uid].clone();
            } else {
                return undefined;
            }
        }

        /**
         * Replaces the PinCollection with another
         * @param  Object pinCollection The PinCollection to update with
         */
        this.replace = function(pinCollection)
        {
            // Process pin additions and updates
            for (var i in pinCollection._pins) {
                this.addOrUpdatePin(pinCollection._pins[i]);
            }

            // Process pin removals
            for (var i in this._pins) {
                if (!(this._pins[i].Uid in pinCollection._pins)) {
                    this.removePin(this._pins[i]);
                }
            }
        }

        /**
         * Removes all pins from the collection
         */
        this.clear = function()
        {
            for (var i in this._pins) {
                this.removePin(this._pins[i]);
            }
        }
    }