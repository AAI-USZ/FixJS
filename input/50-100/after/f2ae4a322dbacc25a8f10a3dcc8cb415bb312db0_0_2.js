function(id, parent_id) {
            var child_list;

            if( parent_id ){
                child_list = $('#child_header_list_' + parent_id);
                
                child_list.append(templates.load_more_row_header(id, parent_id));
            } else {
                grid_row_headers_el.append(templates.load_more_row_header(id, parent_id));
            }
        }