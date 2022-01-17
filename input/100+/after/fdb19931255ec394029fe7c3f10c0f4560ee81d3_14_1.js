function(data) {
		this._super(data);
		this.prepare_when(data, data.creation);

		// escape double quote
		data.content = cstr(data.subject)
			+ " | " + cstr(data.content);
		data.content = data.content.replace(/"/gi, '\"')
						.replace(/</gi, '&lt;').replace(/>/gi, '&gt;');

		if(data.content && data.content.length > 50) {
			data.content = '<span title="'+data.content+'">' +
				data.content.substr(0,50) + '...</span>';
		}
	}