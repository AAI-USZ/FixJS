function(search_params){
        var url, subgrid, tmp_search;
        old_search_params = $.bbq.getState('search');
        
        if (search_params === undefined){
            handle_response([]);
        }
        else if(search_params.subgrid && subgrids[search_params.subgrid.type]){
            subgrid = subgrids[search_params.subgrid.type];
            tmp_search = utils.clone(search_params);
            delete tmp_search['subgrid'];
            $(document).trigger('loading.comparison_grid');
            $.ajax({
                type: 'GET',
                contentType:"application/json",
                url: subgrid.url,
                cache: false,
                data: search_params.subgrid,
                success: function(data){
                    comparison_grid.set_columns(subgrid.cols);
                    comparison_grid.set_mode("details");
                    comparison_grid.show_columns(subgrid.cols);
                    bind_subgrid_selector();
                    draw_grid(data);
                }
            });
        }
        else if (search_urls[search_params.content_type] ){
            unbind_subgrid_selector();
            if (cache.get_state(search_params)){
                comparison_grid.import_data(cache.get_state(search_params));
            }
            else {
                $(document).trigger('loading.comparison_grid');
                $.ajax({
                    type: 'POST',
                    contentType:"application/json",
                    url: search_urls[search_params.content_type],
                    data: JSON.stringify(search_params),
                    success: function(data){
                        comparison_grid.set_columns(env_select.get_paths());
                        select_envs(get_initial_environments());
                        comparison_grid.set_mode("results");
                        draw_grid(data);
                        cache.save_state(comparison_grid, search_params);
                    }
                });
            }
        }
        else{
            console.log(search_params);
        }
    }