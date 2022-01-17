function createJohn(callback) {
		Person.find({ "name": "John" }, function (people) {
			if (people === null) {
				var John = new Person({ "name": "John", "surname": "Doe", "created": new Date(), "age": 25 });
				John.save(function (err, person) {
					callback(person);
				});
			} else {
				callback(people[0]);
			}
		});
	}