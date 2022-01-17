function(value, key){
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
            }