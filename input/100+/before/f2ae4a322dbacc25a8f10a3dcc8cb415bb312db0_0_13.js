function(id, name, row_level, has_children, parent_id) {
            var html = '<li data-id="' + id + '" id="row_header_' + id + '" class="one-line-ellipsis row_header grid_row_level_' + row_level + '" ';

            if( parent_id !== undefined ){
                html += 'data-parent_id="' + parent_id + '"';
            }
            
            if( has_children ){
                html += ' data-collapsed="false"';
            }

            html += '>';
            html += '<span>' + name + '</span>';
            html += '</li>';

            if( has_children ){
                html += '<ul id="child_header_list_' + id + '"></ul>';
            }
    
            return html;
        }