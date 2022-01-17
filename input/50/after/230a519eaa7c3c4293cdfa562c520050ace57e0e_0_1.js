function() {
		data = this.vars_to_save;
		data._http_id = this.http_id;
		data._service = 'restrict-restart';
		return $.post('/tomato.cgi', data);
	}