function Document(json) {
	if (typeof json === 'string') {
		json = JSON.parse(json);
	} else if (!json) {
    json = {};
  }

  if (typeof json !== 'object') {
		throw new Error('A document must be an object');
	}

  this._raw = json;
}