function(r) {
            if (this.hasRowHeader()) {
                return this.rowHeader().data[r];
            } else {
                return '';
            }
        }