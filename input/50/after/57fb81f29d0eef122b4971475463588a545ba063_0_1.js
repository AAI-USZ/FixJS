function(){
			if (this._images) {
				this._setState(0, 1);
				this._slideshowCount = 0;
				this._setSlideshowInterval();
				this.fireEvent("start");
			}
		}