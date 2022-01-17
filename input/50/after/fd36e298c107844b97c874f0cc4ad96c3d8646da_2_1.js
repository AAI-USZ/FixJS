function(card_id) {
					if(confirm("активировать карточку?")) {
						AbonApi.card_activate({
							card_id:card_id
						})									
					}
				}