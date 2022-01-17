function() {
            this.inherited(arguments);

            this.subscribe('/app/toolbar/invoke', this._invokeByName);

            this.onPositionChange(this.position, null);
        }