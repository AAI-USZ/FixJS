function() {
            var result = 0;
            if ( this.count > 0 ) {
                result = 1 - this.missed / this.count;
            }
            this.rate = result;
        }