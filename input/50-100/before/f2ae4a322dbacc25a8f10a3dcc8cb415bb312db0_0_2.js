function(id, name, row_level, has_children, parent_id) {
            var child_list;

            if( parent_id ){
                child_list = $('#child_header_list_' + parent_id);
                
                child_list.append(templates.row_header(id, name, row_level, has_children, parent_id));
            } else {
                grid_row_headers_el.append(templates.row_header(id, name, row_level, has_children, parent_id));
            }
        }