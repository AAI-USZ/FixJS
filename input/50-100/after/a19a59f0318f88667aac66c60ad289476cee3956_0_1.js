function() {
            if ( this.showMeridian ) {
                if ( this.hour === 11 ) {
                    this.toggleMeridian();
                } else if ( this.hour === 12 ) {
                    return this.hour = 1;
                }
            }
            if ( this.hour === 23 ) {
                return this.hour = 0;
            }
            this.hour = this.hour + 1;
        }