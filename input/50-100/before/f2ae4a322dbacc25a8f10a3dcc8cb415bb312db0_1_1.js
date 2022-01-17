function(data){
                    comparison_grid.set_columns(subgrid.cols);
                    comparison_grid.set_mode("details");
                    comparison_grid.show_columns(subgrid.cols);
                    if (search_params.subgrid.type != 'compare'){
                        comparison_grid.set_content_select(utils.values(subgrids));
                    }

                    draw_grid(data);
                }