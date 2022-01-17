function() {
            if (this.showMeridian) {
                if (this.hour === 1) {
                    return this.hour = 12;
                } 
                else if (this.hour === 12) {
                    this.toggleMeridian();
                }
            }
            if (this.hour === 0) {
                return this.hour = 23;
            }
            this.hour = this.hour - 1;
        }