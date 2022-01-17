function(){
			if (this._images) {
				this._setState(1, 0);
				this._slideshowCount = 0;
				this._setSlideshowInterval();
				this.fireEvent("start");
			}
		}