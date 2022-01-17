function(id, name, row_level, has_children, parent_id) {
            var child_list;

            if( parent_id ){
                child_list = $('#child_header_list_' + parent_id);
                
                if( child_list.find('.load_row_header').length > 0 ){
                    child_list.find('.load_row_header').before(templates.row_header(id, name, row_level, has_children, parent_id));
                } else {
                    child_list.append(templates.row_header(id, name, row_level, has_children, parent_id));
                }
            } else {
                grid_row_headers_el.append(templates.row_header(id, name, row_level, has_children, parent_id));
            }
        }