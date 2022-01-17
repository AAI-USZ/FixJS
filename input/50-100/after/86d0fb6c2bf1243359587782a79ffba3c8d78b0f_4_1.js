function(client, data) {
		this._super(client, data);

		this.skinCoordinates 			= [0, 60, 80, 80];
		this.animationList				= {
			'walking':  {numFrame: 8, looping: true},
			'action_0': {numFrame: 13, looping: false},
			'action_1': {numFrame: 9, looping: false},
		};

		if (data == undefined) {
			this.attributes.skin = '';
		}		
		this.activity		 = 0;
	}