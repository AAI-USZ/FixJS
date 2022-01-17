function () {
        var value = this.main.value;
        if ( this.needPlacing() ) {
            return '';
        }

        return value;
    }