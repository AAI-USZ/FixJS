function(date) {
            date = moment(date || null);
            this.set('_selected', date);
            this.input.setValue(date && date.format(this.options.format));
            return this;
        }