function Document(json) {
	if (typeof json === 'string') {
		json = JSON.parse(json);
	} else if (!json) {
    json = {};
    this.empty = true;
  }

  if (typeof json !== 'object') {
		throw new Error('A document must be an object');
	}

  this.body = json;
}