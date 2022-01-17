function(id, to_display, span) {
            var html = $('<li/>', {
                    'id'        : 'column_' + id,
                    'data-id'   : id,
                    'data-span' : span,
                    'class'     : 'one-line-ellipsis column_header hidden'
                }).html(to_display);
 
            return html;
        }