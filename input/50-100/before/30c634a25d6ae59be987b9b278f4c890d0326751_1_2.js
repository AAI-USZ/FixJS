function(resulttype) {
            var title = 'EHP ' + (resulttype == 'base' ? '' : resulttype);
            $(this.result_row_template({'key': resulttype, 'title': title})).appendTo($('table.results tbody', this.el));
        }