function(type, data) {
		this._super(type, data);

		if (data == undefined) {
			this.attributes	= {
				name: ''
			};
			this.type			= type;
			this.x				= 0;
			this.y				= 0;
			this.isMoving		= false;
			this.destinationX	= 0;
			this.destinationY	= 0;
			this.isVisible		= true;
		}
		this.appearance		= 'standing';

		this.animationList				= {
			'walking':  {numFrame: 1, looping: true},
		};

		this.objectType = 'character';
	}