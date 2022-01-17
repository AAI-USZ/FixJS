function () {
        var texture = this.getTexture();

        for (var i = 0; i < this._string.length; i++) {
            var a = this._string.charCodeAt(i) - this._mapStartChar.charCodeAt(0);
            var row = parseInt(a % this._itemsPerRow);
            var col = parseInt(a / this._itemsPerRow);

            var rect = cc.RectMake(row * this._itemWidth, col * this._itemHeight, this._itemWidth, this._itemHeight);
            var c = this._string.charCodeAt(i);
            var fontChar = this.getChildByTag(i);
            if (!fontChar) {
                fontChar = new cc.Sprite();
                if (c == 32) {
                    fontChar.init();
                    fontChar.setTextureRect(cc.RectMake(0, 0, 0, 0));
                }
                else {
                    fontChar.initWithTexture(texture, rect);
                }
                this.addChild(fontChar, 0, i);
            }
            else {
                if (c == 32) {
                    fontChar.init();
                    fontChar.setTextureRect(cc.RectMake(0, 0, 0, 0));
                }
                else {
                    // reusing fonts
                    fontChar.initWithTexture(texture, rect);
                    // restore to default in case they were modified
                    fontChar.setIsVisible(true);
                    fontChar.setOpacity(this._opacity);
                }
            }
            fontChar.setPosition(new cc.Point(i * this._itemWidth + this._itemWidth / 2, this._itemHeight / 2));
        }
    }