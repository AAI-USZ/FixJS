function(id, num_columns, cell_data, row_level, has_children, parent_id) {
            var i,
                html ='<div ';
            
            if( parent_id !== undefined ){
                html += 'data-parent_id="' + parent_id + '" ';
            }

            html += 'id="grid_row_' + id  + '" class="grid_row grid_row_level_' + row_level + '"'; 

            if( has_children ){
                html += ' collapsed="false"';
            }

            html += '>';

            for(i = 0; i < num_columns; i += 1){
                html += cell(cell_data[i]);
            }
            html += '</div>';            

            if( has_children ){
                html += '<ul id="child_list_' + id + '"></ul>';
            }

            return html;
        }