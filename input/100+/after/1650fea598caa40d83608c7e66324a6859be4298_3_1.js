function (options) {
		var self = this;

		this.j2t    = new J2T();

		this.image  = global.document.createElement('canvas');
		this.mask   = global.document.createElement('canvas');
		this.imgc   = this.image.getContext('2d');
		this.maskc  = this.image.getContext('2d');

		this.image.width = 320;
		this.mask.width  = 320;
		this.image.classList.add('image');
		this.mask.classList.add('mask');
		this.image.classList.add('hide');
		this.mask.classList.add('hide');

		this.events = {};

		this.j2t.on('progress', function (p) {
			self.emit('progress', p);
		});

	}