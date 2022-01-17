function() {
        var charArr = this.attrs.text.split('');
        var arr = [];
        var lastWord = '';
        var row = 0;
        this.textArr = [];
        this.textWidth = 0;
        this.textHeight = this._getTextSize(arr[0]).height;
        var lineHeightPx = this.attrs.lineHeight * this.textHeight;
        var addedToLine = true;
        while(charArr.length > 0 && addedToLine && (this.attrs.height === 'auto' || lineHeightPx * (row + 1) < this.attrs.height - this.attrs.padding * 2)) {
            addedToLine = false;
            var line = lastWord;
            lastWord = '';
            while(charArr[0] !== undefined && (this.attrs.width === 'auto' || this._getTextSize(line + charArr[0]).width < this.attrs.width - this.attrs.padding * 2)) {
                lastWord = charArr[0] === ' ' || charArr[0] === '-' ? '' : lastWord + charArr[0];
                line += charArr.splice(0, 1);
                addedToLine = true;
            }

            // remove last word from line
            if(charArr.length > 0) {
                line = line.substring(0, line.lastIndexOf(lastWord));
            }

            this.textWidth = Math.max(this.textWidth, this._getTextSize(line).width);

            if(line.length > 0) {
                arr.push(line);
            }
            row++;
        }

        this.textArr = arr;
    }