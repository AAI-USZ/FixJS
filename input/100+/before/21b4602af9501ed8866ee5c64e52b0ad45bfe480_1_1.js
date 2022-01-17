function () {
        var nextFontPositionX = 0;
        var nextFontPositionY = 0;
        var prev = -1;
        var kerningAmount = 0;

        var tmpSize = cc.SizeZero();

        var longestLine = 0;
        var totalHeight = 0;

        var quantityOfLines = 1;

        var stringLen = this._string.length;

        if (stringLen == 0) {
            return;
        }

        for (var i = 0; i < stringLen; i++) {
            var c = this._string.charCodeAt(i);
            if (c == 10) {
                quantityOfLines++;
            }
        }

        totalHeight = this._configuration.commonHeight * quantityOfLines;
        nextFontPositionY = -(this._configuration.commonHeight - this._configuration.commonHeight * quantityOfLines);

        for (var i = 0; i < stringLen; i++) {
            var c = this._string.charCodeAt(i);

            if (c == 10) {
                nextFontPositionX = 0;
                nextFontPositionY -= this._configuration.commonHeight;
                continue;
            }

            kerningAmount = this._kerningAmountForFirst(prev, c);

            var fontDef = this._configuration.bitmapFontArray[c];

            var rect = fontDef.rect;

            var fontChar = this.getChildByTag(i);
            if (!fontChar) {
                fontChar = new cc.Sprite();
                if (c == 32) {
                    fontChar.init();
                    fontChar.setTextureRect(rect);
                }
                else {
                    fontChar.initWithBatchNodeRectInPixels(this, rect);
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
                    fontChar.initWithBatchNodeRectInPixels(this, rect);
                    // restore to default in case they were modified
                    fontChar.setIsVisible(true);
                    fontChar.setOpacity(255);
                }
            }

            var yOffset = this._configuration.commonHeight - fontDef.yOffset;
            fontChar.setPositionInPixels(cc.ccp(nextFontPositionX + fontDef.xOffset + fontDef.rect.size.width / 2.0 + kerningAmount,
                nextFontPositionY + yOffset - rect.size.height / 2.0));

            // update kerning
            nextFontPositionX += this._configuration.bitmapFontArray[c].xAdvance + kerningAmount;
            prev = c;

            // Apply label properties
            fontChar.setIsOpacityModifyRGB(this._isOpacityModifyRGB);
            // Color MUST be set before opacity, since opacity might change color if OpacityModifyRGB is on
            //fontChar.setColor(this._color);

            // only apply opacity if it is different than 255 )
            // to prevent modifying the color too (issue #610)
            if (this._opacity != 255) {
                fontChar.setOpacity(this._opacity);
            }

            if (longestLine < nextFontPositionX) {
                longestLine = nextFontPositionX;
            }
        }

        tmpSize.width = longestLine;
        tmpSize.height = totalHeight;
        this.setContentSizeInPixels(tmpSize);
    }