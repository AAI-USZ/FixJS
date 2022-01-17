function consumePotion(potion) {
			try {
				if(!$j(".statsTTitle").length) {
					con.log(2, "Going to keep for potions");
					if(caap.navigateTo('keep')) {
						return true;
					}
				}

				var formId = caap.domain.id[caap.domain.which] + "consume_1", potionDiv = $j(), button = null;

				if(potion === 'stamina') {
					formId = caap.domain.id[caap.domain.which] + "consume_2";
				}

				con.log(1, "Consuming potion", potion);
				potionDiv = $j("form[id='" + formId + "'] input[src*='keep_consumebtn.jpg']");
				if(potionDiv && potionDiv.length) {
					button = potionDiv;
					if(button) {
						caap.click(button);
					} else {
						con.warn("Could not find consume button for", potion);
						return false;
					}
				} else {
					con.warn("Could not find consume form for", potion);
					return false;
				}

				return true;
			} catch (err) {
				con.error("ERROR in consumePotion: " + err, potion);
				return false;
			}
		}