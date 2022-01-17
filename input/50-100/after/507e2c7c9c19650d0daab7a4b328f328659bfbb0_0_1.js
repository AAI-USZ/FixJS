function(attrs) {
			if (!this.isNew() &&(attrs.id ===undefined ||
					!_.isString(attrs.content) ||
					attrs.creationDate ===undefined ||
					attrs.ownerUser === undefined))
				{
				console.log("Error: tweet must have id, content, cretion_date, and owner_user");
				return "Error: tweet must have id, content, cretion_date, and owner_user";
				}
		}