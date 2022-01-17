function (e) {
            var el = $(e.currentTarget);
            var column = el.attr('data-column');
            var direction = el.hasClass('asc') ? 'DESC' : 'ASC';
            this.grid.$thead.find('.asc,.desc').removeClass('asc').removeClass('desc');
            this.sortOn(direction, column);
            this.updateColumnClass(el, direction);
        }