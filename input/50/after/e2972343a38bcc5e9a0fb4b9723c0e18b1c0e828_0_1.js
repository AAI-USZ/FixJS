function () {
					console.log(Deco.name + " and " + Hugo.name + " are now " + John.fullName() + "'s pets");

					John.getPets(function (pets) {
						console.log(pets);
					});
				}