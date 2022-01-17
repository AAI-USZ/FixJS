function (t) {
		this.tile = t;
		if(t !== -1) {
			tilePosition.Y = parseInt(t / (this.image.width / this.tileSize.Height), 10) * this.tileSize.Height;
			tilePosition.X = parseInt(t % (this.image.width / this.tileSize.Height), 10) * this.tileSize.Width;
            //tilePosition.Y = 0;
            //tilePosition.X = this.tileSize.Width * t;			
		}
	}