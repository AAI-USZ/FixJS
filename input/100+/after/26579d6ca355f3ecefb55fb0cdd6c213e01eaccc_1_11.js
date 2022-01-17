function(html){
		if (html == null) html = '';
		else if (typeOf(html) == 'array') html = html.join('');
		this.innerHTML = html;
	}