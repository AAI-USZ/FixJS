function(err, objectFromDB) {
						if (!objectFromDB || objectFromDB == '') {
							instance.update({id: query.id}, object, callback, options);
						} else {
							callback({id:"A  record with id -" + object.id + " is already exists in our database. Please enter new values."});
						}
					}