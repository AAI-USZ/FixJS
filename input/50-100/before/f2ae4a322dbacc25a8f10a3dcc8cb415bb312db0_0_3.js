function(row, key) {
                    if( row['metadata'] ){
                        add_metadata_row(row['id'], row['parent_id'], row['page_size']);
                    } else {
                        add_row(row['id'], row['name'], row['cells'], row['parent_id'], row['comparable']);
                    }
                }