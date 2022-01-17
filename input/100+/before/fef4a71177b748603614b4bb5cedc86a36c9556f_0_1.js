function(data) {
		this._super(data);
		this.prepare_when(data, data.creation);

		// escape double quote
		data.content = cstr(data.subject).replace(/"/gi, '\"')
			+ " | " + cstr(data.content).replace(/"/gi, '\"');

		if(data.content && data.content.length > 50) {
			data.content = '<span title="'+data.content+'">' +
				data.content.substr(0,50) + '...</span>';
		}
	}