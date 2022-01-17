function Model(data) {
		/*A proxy object that can be written to
			or read from to invoke the Model's set and get functions */
		this.observable = Object.defineProperty({}, "_model", {
			"value": this,
			"enumerable": false
		});
		this._rawData = {}; //the raw model data
		this._keyDeps = {}; //the key's dependent contexts - indexed by key.
		this._invalid = {}; //list of keys that are invalid
		this.validation = {}; //list of validation functions for each key
		//this._keyDeps[key] is an Object of contexts, indexed by context ID
		
		//If data was passed into the constructor, add each property to the Model
		if(data)
			for(var i in data)
				this.add(i, data[i]);
	}