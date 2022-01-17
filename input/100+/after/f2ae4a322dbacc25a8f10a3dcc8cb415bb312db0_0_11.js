function(event){
                var cell = grid.models.rows.get($(this).parent().data('id'));
                
                if( !$(this).hasClass('disabled') ){
                    $(this).addClass('disabled').parent().find('.spinner').css('visibility', 'visible');
                    event.preventDefault();
                    $(document).trigger({type : 'load_more.comparison_grid', cell_data : cell['data'], offset : cell['current']});
                }
            }