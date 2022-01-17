function(card_id) {
					if(confirm("удалить карточку?")) {
						AbonApi.card_unbind({
							card_id:card_id
						})				
					}
				}