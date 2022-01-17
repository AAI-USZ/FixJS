function() {
            if ( this.showMeridian ) {
                if (this.hour === 1) {
                    this.hour = 12;
                    return this.toggleMeridian();
                } 
            }
            if (this.hour === 0) {
                return this.hour = 23;
            }
            this.hour = this.hour - 1;
        }