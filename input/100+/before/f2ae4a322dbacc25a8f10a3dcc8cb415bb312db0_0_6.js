function(data){
            num_columns_shown = 0;

            utils.each(models.columns, function(value, key){
                if( data[key] ){
                    $('#column_headers').width($('#column_headers').width() + 100);
                    $('#column_' + key).show();
                    models.columns[key]['shown'] = true;
                    num_columns_shown += models.columns[key]['span'];
                    $('.cell_' + key).show();
                } else {
                    models.columns[key]['shown'] = false;
                    $('#column_' + key).hide();
                    $('.cell_' + key).hide();
                }
            });

            if( num_columns_shown > max_visible_columns ){
                controls.horizontal_scroll.show();            
                $('#column_headers_window').width(100 * max_visible_columns);
            } else {
                controls.horizontal_scroll.hide();
                $('#column_headers_window').width(num_columns_shown * 100);
            }
        }