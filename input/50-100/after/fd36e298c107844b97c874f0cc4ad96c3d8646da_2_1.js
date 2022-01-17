function(card_service_id) {
					if(confirm("удалить тариф?")) {
						AbonApi.cards_tp_delete({
							cs_id:card_service_id
						})
					}
				}