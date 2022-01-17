function() {
            if ( this.showMeridian ) {
                if ( this.hour === 12 ) {
                    this.hour = 1;
                    return this.toggleMeridian();
                }
            }
            if ( this.hour === 23 ) {
                return this.hour = 0;
            }
            this.hour = this.hour + 1;
        }