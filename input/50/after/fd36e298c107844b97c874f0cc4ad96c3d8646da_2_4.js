function(card_service_id) {
					if(confirm("активировать тариф?")) {
						AbonApi.cards_tp_activate({
							cs_id:card_service_id
						})					
					}
				}