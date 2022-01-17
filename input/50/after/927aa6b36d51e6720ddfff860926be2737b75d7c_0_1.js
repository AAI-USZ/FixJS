function(err, objectFromDB) {
					if (!objectFromDB || objectFromDB == '') {
						instance.save(object, callback, options);
					} else {
						callback({id:"A  record with id -" + object.id + " is already exists in our database. Please enter new values."});
					}
				}