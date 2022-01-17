function(func) {
        var id = undefined;
		if (this.anim) { 
		id = this.anim.id; 
		}
        this.anim = {
            func: func,
			id: id // set anim.id
        };
    }