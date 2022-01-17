function(evt) {
            var inputDate = moment(this.input.getValue(), this.options.format);
            if (inputDate) {
                this.setValue(inputDate.format('YYYY-MM-DD') !== invalidDate?
                        inputDate : this.getValue());
            }
        }