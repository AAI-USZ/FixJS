function(item) {
                if( item['metadata'] ){
                    insert = models.rows.insert_metadata(item['id'], item['parent_id'], item['page_size'], item['current_count'], item['total'], item['data']);
                } else {
                    insert = models.rows.insert(item['id'], item['name'], item['cols'], item['parent_id'], item['comparable']);

                    if( !initial ){
                        append_rows.push(insert);
                    }
                }
            }