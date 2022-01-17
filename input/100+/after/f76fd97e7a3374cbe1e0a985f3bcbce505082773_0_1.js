function(mode, options){
            var columns_to_show = {};
                
            models.mode = (mode === undefined) ? models.mode : mode;

            if( models.mode === 'results' ){
                controls.column_selector.show();
                utils.each(
                    utils.filter(models.columns, 
                        function(col){
                            return col['shown'] === true;
                        }
                    ),
                    function(element, index) {
                        columns_to_show[element['id']] = {};
                    }
                );
                show_columns(columns_to_show);
                $('#grid_header').find('header h2[data-title="results"]').show();
                $('#grid_header').find('header h2[data-title="details"]').hide();
                $('#return_to_results_btn').hide();
                controls.change_content_select.hide();
            } else if( models.mode === 'details' ){
                controls.column_selector.hide();
                show_columns(models.columns);
                $('#grid_header').find('header h2[data-title="results"]').hide();
                $('#grid_header').find('header h2[data-title="details"]').show();
                $('#grid_header').find('header .button').show();
                controls.change_content_select.show();
            }
            if(options){
                if(options['show_compare_btn']){
                    controls.comparison.show();
                }
                else{
                    controls.comparison.hide();
                }
            }
        }