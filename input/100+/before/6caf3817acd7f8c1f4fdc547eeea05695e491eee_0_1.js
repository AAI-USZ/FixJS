function() {
            last_game = game;
            
            $("#game").stop(true, true).fadeIn(500);
            $(".spinner").stop(true, false).fadeOut(500);
            
            var game_label = $("#" + game + "_label");
            if(game_label.offset()!=null) {
                 $('#games').animate({
                    scrollTop: game_label.offset().top - $("#games").offset().top + $('#games').scrollTop() - 10
                }, 500);
            }

    		setUpToolTips();	
    	}