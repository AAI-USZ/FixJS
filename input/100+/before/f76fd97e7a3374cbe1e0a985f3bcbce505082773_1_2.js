function(search_params){
        if (search_pages[search_params.content_type].comparable){
            comparison_grid.controls.comparison.show();
        }
        else {
            comparison_grid.controls.comparison.hide();
        }

        if (cache.get_state(search_params)){
            comparison_grid.import_data(cache.get_state(search_params));
        }
        else {
            $(document).trigger('loading.comparison_grid');
            $.ajax({
                type: 'POST',
                contentType:"application/json",
                url: search_pages[search_params.content_type].url,
                data: JSON.stringify(search_params),
                success: function(data){
                    comparison_grid.set_columns(env_select.get_paths());
                    select_envs(get_initial_environments());
                    comparison_grid.set_title(data.name);
                    comparison_grid.set_mode("results");
                    draw_grid(data.rows);
                    cache.save_state(comparison_grid, search_params);
                }
            });
        }
    }