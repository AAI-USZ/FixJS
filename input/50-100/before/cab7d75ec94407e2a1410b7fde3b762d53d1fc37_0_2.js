function() {
		var fields = this.getFields();
		for(var field in fields) {
			if (fields[field].hasOwnProperty('primaryKey')) return fields[field].name;
		}
	}