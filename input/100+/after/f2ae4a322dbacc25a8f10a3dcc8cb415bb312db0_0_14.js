function(id, load_size, current, total){
            var html = $('<div/>', { 
                            'class'     : 'load_row grid_row',
                            'data-id'   : id,
                        });
                
            html.append('<i class="spinner invisible" />');
            html.append('<a class="load_row_link" href="" >' + i18n.show_more.replace('%P', load_size) + '</a>');
            html.append('<i class="down_arrow-icon-black"/>');
            html.append('<span>' + i18n.counts.replace('%C', current).replace('%T', total) + '</span>');

            return html;
        }