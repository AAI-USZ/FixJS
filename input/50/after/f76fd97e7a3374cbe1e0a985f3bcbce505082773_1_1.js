function(event){
            var environments = env_select.get_selected();
            comparison_grid.show_columns(environments);
            $.bbq.pushState({environments:environments});
            env_select.reposition();
        }