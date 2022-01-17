function(row, key) {
                    if( row['metadata'] ){
                        update_metadata_row(row['id'], row['current'], row['total']);
                    } else {
                        add_row(row['id'], row['name'], row['cells'], row['parent_id'], row['comparable']);
                    }
                }