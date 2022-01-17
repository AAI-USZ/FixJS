function(id, name, row_level, has_children, parent_id) {
            var html = $('<li/>', { 
                            'data-id'   : id,
                            'id'        : 'row_header_' + id,
                            'class'     : 'one-line-ellipsis row_header grid_row_level_' + row_level
                        });

            if( parent_id !== undefined ){
                html.attr('data-parent_id', parent_id);
            }
            
            if( has_children ){
            }

            html.append('<span>' + name + '</span>');

            if( has_children ){
                if( row_level === 2 ){
                    html.prepend(collapse_arrow({ open : false }));
                    html.attr('data-collapsed', "true");
                    html = html.after($('<ul/>', { id : 'child_header_list_' + id, class : 'hidden' }));
                } else {
                    html.prepend(collapse_arrow({ open : true }));
                    html.attr('data-collapsed', "false");
                    html = html.after($('<ul/>', { id : 'child_header_list_' + id }));
                }   
            }
    
            return html;
        }