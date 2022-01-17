function(attrs) {
			if (attrs.id ===undefined ||
					!_.isString(attrs.content) ||
					attrs.creation_date ===undefined ||
					attrs.owner_user === undefined)
				{
				console.log("Error: tweet must have id, content, cretion_date, and owner_user");
				return "Error: tweet must have id, content, cretion_date, and owner_user";
				}
		}