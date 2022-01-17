function(resulttype) {
            var title = 'EHP ' + (resulttype == 'base' ? '' : resulttype);
            $(this.result_row_template({'key': resulttype, 'title': title})).appendTo($('.character table.results tbody', this.el));
        }