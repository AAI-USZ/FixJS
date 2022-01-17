function(){
		var top = Math.floor(Math.random()*settings.height)
		var left = Math.floor(Math.random()*settings.width)
		var coin = $('<img class="jq_coins" src="/mario.gif" style="height: 50px">')

		var c = coin.clone().css({position: 'absolute', top: top +'px', left: left +'px'})

		c.mouseover(function(){
		    score += settings.points;
		    var aud = $('<audio autoplay="autoplay"><source src="/mario.ogg" type="audio/ogg" /></audio>').clone().remove()

		    coins_left -= 1;
		    $(this).hide().remove()
		    settings.coin_callback()
		    if(coins_left === 0){
			settings.got_all_coins_callback(score)
		    }
		})
		return c;
	    }