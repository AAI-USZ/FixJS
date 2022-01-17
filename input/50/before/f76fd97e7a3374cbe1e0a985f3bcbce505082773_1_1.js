function(event){
            var environments = env_select.get_selected();
            $.bbq.pushState({environments:utils.values(environments)});
            comparison_grid.show_columns(environments);
            env_select.reposition();
        }