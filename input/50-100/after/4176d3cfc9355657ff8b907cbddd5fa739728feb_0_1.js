function (ev) {
		ev.preventDefault();
		this.model.add(new Datea.Image({order: (this.model.length -1)}), {silent:true});
		this.render();
	}