function(card_id) {
					if(confirm("отключить карточку?")) {
						AbonApi.card_deactivate({
							card_id:card_id
						})															
					}
				}