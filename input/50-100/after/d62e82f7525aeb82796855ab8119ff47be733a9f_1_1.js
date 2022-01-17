function(){
		if(document.getSize().y < this.element.getSize().y) {
			this.detachScroll().reset();
		} else {
			this.attachScroll().scroll();
		}
		return this;
	}