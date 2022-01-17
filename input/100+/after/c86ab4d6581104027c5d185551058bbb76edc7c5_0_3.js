function(updated) {
            var date = this.options.date, selected = this.options._selected;

            this._selectedDate = DatePicker.sameMonth(date, selected)?
                selected.date() : null;

            if (updated.date && date) {
                this._num = DatePicker.numDaysInMonth(date);
                this._first = moment(
                    date.year() + '-' + (date.month()+1) + '-1',
                    'YYYY-MM-DD');
                this._numRows = Math.ceil((this._first.day() + this._num) / 7);
                this.render();
            }
            if (updated._selected) {
                this.render();
            }
        }