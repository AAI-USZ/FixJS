function(value, key){
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
            }