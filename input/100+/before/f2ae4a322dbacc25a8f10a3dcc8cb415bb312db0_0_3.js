function(append) {
            append = (append === undefined) ? false : append;

            if( !append ){
                grid_content_el.empty();
                grid_row_headers_el.empty();
            }

            if( append ){
                utils.each(append, function(row, key) {
                    if( row['metadata'] ){
                        add_metadata_row(row['id'], row['parent_id'], row['page_size']);
                    } else {
                        add_row(row['id'], row['name'], row['cells'], row['parent_id'], row['comparable']);
                    }
                });
            } else {
                utils.each(models.rows.get(), function(row, key) {
                    if( row['metadata'] ){
                        add_metadata_row(row['id'], row['parent_id'], row['page_size']);
                    } else {
                        add_row(row['id'], row['name'], row['cells'], row['parent_id'], row['comparable']);
                    }
                });
            }

            utils.each(models.columns, function(column, key){
                if( column['shown'] ){
                    $('.cell_' + key).show();
                } else {
                    $('.cell_' + key).hide();
                }
            });
            
            if( utils.size(models.columns) > max_visible_columns ){
                $('.grid_row').css('width', 
                    utils.reduce(models.columns, function(memo, col){ return ((parseInt(col['span'], 10) * 100) + memo); }, 0));
            } else {
                $('.grid_row').css('width', 500);
            }
            
            set_loading(false);
        }