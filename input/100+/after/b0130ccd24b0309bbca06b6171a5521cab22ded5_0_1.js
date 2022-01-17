function(posX, posY, width) {
		enchant.Sprite.call(this, 0, 0);
		this.fontSize = 16;
		this.widthItemNum = 16;
		// font.png の横の文字数
		this.x = posX;
		this.y = posY;
		this.text = '';
		if (arguments[2]) {
			this.row = Math.floor(arguments[2] / this.fontSize);
		}
	}