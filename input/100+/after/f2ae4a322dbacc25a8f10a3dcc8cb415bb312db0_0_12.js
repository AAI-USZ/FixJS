function(id, num_columns, cell_data, row_level, has_children, parent_id) {
            var i,
                html = $('<div/>', {
                    id      : 'grid_row_' + id,
                    class   : 'grid_row grid_row_level_' + row_level
                });
            
            if( parent_id !== undefined ){
                html.attr('data-parent_id', parent_id);
            }

            if( has_children ){
                html.attr('data-collapsed', "false");
            }

            for(i = 0; i < num_columns; i += 1){
                html.append(cell(cell_data[i]));
            }

            if( has_children ){
                if( row_level !== 2 ){
                    html = html.after($('<ul/>', { id : 'child_list_' + id }));
                } else {
                    html = html.after($('<ul/>', { id : 'child_list_' + id, class : 'hidden' }));
                }   
            }

            return html;
        }