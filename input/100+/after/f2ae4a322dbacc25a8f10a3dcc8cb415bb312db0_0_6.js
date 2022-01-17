function(data){
            var last_visible,
                previous_num_shown = num_columns_shown;

            num_columns_shown = 0;

            utils.each(models.columns, function(value, key){
                if( data[key] ){
                    models.columns[key]['shown'] = true;
                    num_columns_shown += parseInt(models.columns[key]['span'], 10);
                    $('.cell_' + key).show();
                    $('#column_' + key).show();
                } else {
                    models.columns[key]['shown'] = false;
                    $('#column_' + key).hide();
                    $('.cell_' + key).hide();
                }
            });

            $('#column_headers').width(num_columns_shown * 100);

            if( num_columns_shown > max_visible_columns ){

                if( previous_num_shown > num_columns_shown ){
                    if( $('#column_headers').find(':not(:hidden)').last().position().left + 100 === -($('#column_headers').position().left) + 400 ){
                        controls.horizontal_scroll.slide('right');
                    }
                }
                controls.horizontal_scroll.show();            
                $('#column_headers_window').width(100 * max_visible_columns);
            } else {
                controls.horizontal_scroll.reset();
                controls.horizontal_scroll.hide();
                $('#column_headers_window').width(num_columns_shown * 100);
            }
        }