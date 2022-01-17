function(x, y, direction, data) {
		this._super(x, y, data);

		this.skinCoordinates 			= [0, 60, 80, 80];
		this.animationList.extend({
			'walking':  {numFrame: 1, looping: false},
			'speaking':  {numFrame: 13, looping: false},
		});

		this.attributes.name			= 'Hobo';
		this.attributes.skin 			= 1;
		this.isEnnemy 					= false;
		this.direction					= direction;

		this.triggerSpeach();
	}