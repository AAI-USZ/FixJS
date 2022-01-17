function(updated) {
            var date = this.options.date, selected = this.options._selected;
            if (updated.date) {
                this.menu.$node.find('h4 .title').text(date.format('MMMM YYYY'));
                this.monthView.set('date', date);
            }
            if (updated._selected) {
                this.monthView.set('_selected', selected);
            }
        }