function(){
        var initial_search = $.bbq.getState('search');
        paths = paths_in;
        env_select = KT.path_select('column_selector', 'env', paths,
            {select_mode:'multi', link_first: true});

        init_tipsy();

        comparison_grid = KT.comparison_grid();
        comparison_grid.init();
        comparison_grid.set_columns(env_select.get_paths(), true);

        browse_box = KT.widget.browse_box("content_selector", KT.widgets, KT.mapping, initial_search);
        $(document).bind(browse_box.get_event(), search_initiated);

        bind_search_event();
        bind_env_events();
        bind_hover_events();
        bind_load_more_event();
        bind_subgrid_selector();

        $(document).bind('return_to_results.comparison_grid', remove_subgrid);

        select_envs(get_initial_environments());

        if(initial_search){
            search_initiated(initial_search);
        }
    }