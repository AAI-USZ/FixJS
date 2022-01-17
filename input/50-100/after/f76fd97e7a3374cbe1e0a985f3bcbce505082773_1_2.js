function(data){
                    comparison_grid.set_columns(env_select.get_paths());
                    select_envs(get_initial_environments());
                    comparison_grid.set_title(data.name);
                    comparison_grid.set_mode("results", {show_compare_btn:search_pages[search_params.content_type].comparable});
                    draw_grid(data.rows);
                    cache.save_state(comparison_grid, search_params);
                }