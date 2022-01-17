function (error, results) {
			var
				hasErrors = false,
				field;

			for (field in results) {
				if (results[field] === null) {
					delete (results[field]);
				} else {
					hasErrors = true;
				}
			}
			if (hasErrors) {
				callback(results, undefined);
			} else {
				callback(undefined, data);
			}
		}