function (John) {
		// create the Pet Deco (if it does not exist)
		createDeco(function (Deco) {
			// create the Pet Hugo (if it does not exist)
			createHugo(function (Hugo) {
			// add Deco and Hugo has John's pets
				John.addPets(Deco, Hugo, {
					since: new Date(),
					nickname: "doggy"
				}, function () {
					console.log(Deco.name + " and " + Hugo.name + " are now " + John.fullName() + "'s pets");

					John.getPets(function (pets) {
						console.log(pets);
					});
				});
			});
		});
	}