function(p){
		var dp = (p||this.parent);
		if(dp != this.displayElement.parentNode){
			this.hide();
			dp.appendChild(this.displayElement);
		}
		this.displayed = true;
	}