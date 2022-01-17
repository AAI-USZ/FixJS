function(id, parent_id, page_size){
            var child_list;

            if( $('.load_row[data-id="' + id + '"]').length === 0 ){
                add_row_header(id, '', 3, false, parent_id);

                if( parent_id ){
                    child_list = $('#child_list_' + parent_id);
                    child_list.append(templates.load_more_row(id, page_size));
                } else {
                    grid_content_el.append(templates.load_more_row(id, page_size));
                }
            }
        }