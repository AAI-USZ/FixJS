function() {
		this.inherited(arguments);
		this.info && this.$.icon.setSrc("gallery_images/" + this.info.name + ".jpg");
	}