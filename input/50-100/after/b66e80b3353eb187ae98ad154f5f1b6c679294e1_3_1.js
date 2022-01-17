function(row){
                var gameList = new gameView($(this).closest('li').attr('id'));
                $(this).closest('li').find('#games').html(gameList.render().$el);
            }