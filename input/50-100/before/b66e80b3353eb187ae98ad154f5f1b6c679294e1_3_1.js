function(row){
                var gameList = new gameView($(this).closest('li').find('div').text());
                $(this).closest('li').append(gameList.render().$el);
            }