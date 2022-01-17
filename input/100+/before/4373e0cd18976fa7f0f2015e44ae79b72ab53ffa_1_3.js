function(paths_in){
    var browse_box, old_search_params, env_select, paths,
        cache = KT.content_search_cache,
        utils = KT.utils,
    subgrids = {
        repo_packages:{id:'repo_packages',
                       name:i18n.packages,
                       url:KT.routes.repo_packages_content_search_index_path(),
                       cols:{description:{id:'description', name:i18n.description, span : "5"}}

        },
        repo_errata  :{id:'repo_errata',
                       name:i18n.errata,
                       url:KT.routes.repo_errata_content_search_index_path(),
                       cols:{
                           title : {id:'title', name:i18n.title, span: "2"},
                           type  : {id:'type', name:i18n.type},
                           severity : {id:'severity', name:i18n.severity},
                           issued : {id:'issued', name:i18n.issued}
                         }
        }

    },
    search_urls = {errata:KT.routes.errata_content_search_index_path(),
                        repos:KT.routes.repos_content_search_index_path(),
                        products:KT.routes.products_content_search_index_path(),
                        packages:KT.routes.packages_content_search_index_path()
    },
    more_results_urls = {
        errata:   KT.routes.errata_items_content_search_index_path(),
        packages: KT.routes.packages_items_content_search_index_path()
    },
    subgrid_selector = [
        {id:'repo_errata', name:i18n.errata},
        {id:'repo_packages', name:i18n.packages}
    ];



    var init = function(){
        var initial_search = $.bbq.getState('search');
        paths = paths_in;
        env_select = KT.path_select('column_selector', 'env', paths,
            {select_mode:'multi', link_first: true});

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
    },
    get_initial_environments = function(){
        var initial_envs = $.bbq.getState('environments');
        if(!initial_envs && paths[0]){
            initial_envs = [paths[0][0]] ;
        }
        return initial_envs;
    },
    search_initiated = function(e, search_params){ //'go' button was clicked
        var old_params = $.bbq.getState('search');
        KT.content_search_cache.clear_state();
        $.bbq.pushState({search:search_params, subgrid:{}, environments:get_initial_environments()}); //Clear the subgrid
        search_params =  $.bbq.getState("search"); //refresh params, to get trim empty entries
        //A search was forced, but if everything was equal, nothing would happen, so force it
        if(utils.isEqual(old_params, search_params)){
            do_search(search_params);
        }
    },
    select_envs = function(environment_list){
        var env_obj = {};

        utils.each(environment_list, function(env){
            env_obj[env.id] = env;
            env_select.select(env.id)
        });

        comparison_grid.show_columns(env_obj);
        env_select.reposition();
    },
    bind_load_more_event = function(){
      $(document).bind('load_more.comparison_grid', function(event){
        var search = utils.extend($.bbq.getState('search'), event.cell_data);
          search.offset = event.offset;

        $.ajax({
          type: 'POST',
          contentType:"application/json",
          url: more_results_urls[search.content_type],
          cache: false,
          data: JSON.stringify(search),
          success: function(data){
            $(document).trigger('show_more.comparison_grid', [data]);
          }
        })
      });
    },
    bind_search_event = function(){
        $(window).bind('hashchange.search', function(event) {
            var search_params = $.bbq.getState('search');
            if (!utils.isEqual(old_search_params, search_params)) {
                do_search(search_params);
            }
        });
    },
    do_search = function(search_params){
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
                    if (search_params.subgrid.type !== 'compare'){
                        comparison_grid.set_content_select(utils.values(subgrids));
                    }
                    comparison_grid.set_title(data.name);
                    draw_grid(data.rows);
                }
            });
        }
        else if (search_urls[search_params.content_type] ){

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
                        draw_grid(data);
                        cache.save_state(comparison_grid, search_params);
                    }
                });
            }
        }
        else{
            console.log(search_params);
        }
    },
    draw_grid = function(data){
        comparison_grid.set_rows(data, true);
    },
    bind_hover_events = function(){
        var grid = $('#comparison_grid');
        grid.delegate(".subgrid_link", 'click', function(){
            var search = $.bbq.getState('search');
            search.subgrid = $(this).data();
            $.bbq.pushState({search:search});
        }, 'json');
    },
    bind_env_events = function(){
        //submit event
        $(document).bind(env_select.get_submit_event(), function(event, environments) {
           //if doing unique, or shared, research
 
        });
        //select event
        $(document).bind(env_select.get_select_event(), function(event){
            var environments = env_select.get_selected()
            $.bbq.pushState({environments:utils.values(environments)});
            comparison_grid.show_columns(environments);
            env_select.reposition();
        });
    },
    bind_subgrid_selector = function(){
        $(document).bind('change_details_content.comparison_grid', function(event){
            change_subgrid_type(event.content_type);
        });
    },
    unbind_subgrid_selector = function(){
        return;
        $(document).unbind("foo");
    },
    change_subgrid_type = function(type){
        var search = $.bbq.getState('search');
        if(search.subgrid){
            search.subgrid.type = type;
            $.bbq.pushState({search:search});
        }
    },
    remove_subgrid = function(){
        var search = $.bbq.getState('search');
        if(search.subgrid){
            delete search['subgrid'];
            $.bbq.pushState({search:search});
        }
    };

    init();
    return {
        change_subgrid_type:change_subgrid_type,
        remove_subgrid: remove_subgrid
        //env_select: function(){return env_select}
    }
}