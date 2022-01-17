function(value) {
			return !!value ? new Handlebars.SafeString(value.toString()) : "";
		}