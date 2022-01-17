function(posX, posY, width, height) {
		enchant.Sprite.call(this, 0, 0);
		var width = (arguments[2] || enchant.Game.instance.width);
		var height = (arguments[3] || enchant.Game.instance.height);
		this.fontSize = 16;
		this.widthItemNum = 16;
		// font.png の横の文字数
		this.returnLength = width/this.fontSize;
		// 改行を入れる文字数
		this.image = new Surface(width, height);
		this.x = posX;
		this.y = posY;
		this.text = '';
	}