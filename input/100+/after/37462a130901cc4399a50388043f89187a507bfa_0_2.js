function(txt) {
		var i, x, y, wNum, charCode, charPos;
		this._text = txt;
		if (!this.returnLength) {
			this.width = Math.min(this.fontSize * this._text.length, enchant.Game.instance.width);
		} else {
			this.width = Math.min(this.returnLength * this.fontSize, enchant.Game.instance.width);
		}
		this.height = this.fontSize * (Math.ceil(this._text.length / this.row) || 1);
		this.image = new Surface(this.width, this.height);
		this.image.context.clearRect(0, 0, this.width, this.height);
		for(i=0; i<txt.length; i++) {
			charCode = txt.charCodeAt(i);
			if (charCode >= 32 && charCode <= 127) {
				charPos = charCode - 32;
			} else {
				charPos = 0;
			}
			x = charPos % this.widthItemNum;
			y = (charPos / this.widthItemNum)|0;
			this.image.draw(enchant.Game.instance.assets['font.png'], 
				x * this.fontSize, y * this.fontSize, this.fontSize, this.fontSize,
				(i%this.row)*this.fontSize, ((i/this.row)|0)*this.fontSize, this.fontSize, this.fontSize);
		}
	}