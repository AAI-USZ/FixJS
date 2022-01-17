function (error, results) {
			var
				hasErrors = false,
				field;

			for (field in results) {
				if (results[field] === null || results[field] === undefined) {
					delete (results[field]);
				} else {
					hasErrors = true;
				}
			}
			if (hasErrors) {
				callback(results, data);
			} else {
				callback(undefined, data);
			}
		}