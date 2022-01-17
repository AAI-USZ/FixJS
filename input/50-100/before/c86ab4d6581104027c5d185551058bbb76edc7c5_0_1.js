function(evt) {
            var inputDate = moment(this.input.getValue(), this.options.format);
            if (!inputDate) {
                return;
            }
            this.setValue(inputDate.format('YYYY-MM-DD') !== invalidDate?
                    inputDate : this.getValue());
            this.menu.hide();
        }