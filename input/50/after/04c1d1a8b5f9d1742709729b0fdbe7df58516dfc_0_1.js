function(i,user){
				if(user != null) {
					$(".results").append(Card.build(user).fadeIn(1000));
				}
			}