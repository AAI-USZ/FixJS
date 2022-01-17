function (t) {
		this.tile = t;
		//var tph = this.image.width / this.tileSize.Width;
		if(t !== -1) {
			tilePosition.Y = parseInt(t / (this.image.width / this.tileSize.Width), 10) * this.tileSize.Height;
			tilePosition.X = parseInt(t % (this.image.width / this.tileSize.Width), 10) * this.tileSize.Width;
            //tilePosition.Y = 0;
            //tilePosition.X = this.tileSize.Width * t;			
		}
	}