function(){
		if(this.getDocHeight() < this.element.getSize().y) {
			this.detachScroll().reset();
		} else {
			this.attachScroll().scroll();
		}
		return this;
	}