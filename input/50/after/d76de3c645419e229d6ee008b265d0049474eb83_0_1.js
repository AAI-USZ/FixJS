function() {
		this.inherited(arguments);
		if (this.info) {
			this.$.icon.setSrc("gallery_images/" + this.info.name + ".jpg");
		}
	}