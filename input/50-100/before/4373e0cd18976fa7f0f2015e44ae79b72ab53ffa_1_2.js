function(data){
                        comparison_grid.set_columns(env_select.get_paths());
                        select_envs(get_initial_environments());
                        draw_grid(data);
                        cache.save_state(comparison_grid, search_params);
                    }