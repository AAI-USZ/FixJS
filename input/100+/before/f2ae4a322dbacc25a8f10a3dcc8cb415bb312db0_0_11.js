function(event){
                var cell = grid.models.rows.get($(this).parent().data('id'));
                event.preventDefault();
                $(document).trigger({type:'load_more.comparison_grid', cell_data:cell['data'], offset:cell['current']});
            }