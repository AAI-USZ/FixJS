function(){
		    score += settings.points;
		    var aud = $('<audio autoplay="autoplay"><source src="/mario.ogg" type="audio/ogg" /></audio>').clone().remove()

		    coins_left -= 1;
		    $(this).hide().remove()
		    settings.coin_callback()
		    if(coins_left === 0){
			settings.got_all_coins_callback(score)
		    }
		}