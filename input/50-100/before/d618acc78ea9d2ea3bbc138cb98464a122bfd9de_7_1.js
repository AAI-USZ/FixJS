function(data) {
		this._super(data);

		var hobo1 = new Hobo(20, 10, 'ne', this.getCharacterData('The terrible NPC'));
		var hobo2 = new Hobo(31, 19, 'se', this.getCharacterData('The terrible NPC'));
		var hobo3 = new Hobo(19, 35, 'sw', this.getCharacterData('The terrible NPC'));

		this.attachCharacter(hobo1);
		this.attachCharacter(hobo2);
		this.attachCharacter(hobo3);

		/*var camera = new Camera(10, 10, this.getObjectData('Camera'));
		this.attachObject(camera);*/
	}