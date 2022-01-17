function(txt) {
		var i, x, y, wNum, charCode, charPos;
		this._text = txt;
		this.width = this.returnLength * this.widthItemNum;
		this.height = this.fontSize * (((this._text.length / this.returnLength)|0)+1);
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
				(i%this.returnLength)*this.fontSize, ((i/this.returnLength)|0)*this.fontSize, this.fontSize, this.fontSize);
		}
	}