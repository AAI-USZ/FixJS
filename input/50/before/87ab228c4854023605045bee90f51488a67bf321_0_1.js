function () {
        var value = this.main.value;
        if ( this._placing ) {
            return '';
        }

        return value;
    }