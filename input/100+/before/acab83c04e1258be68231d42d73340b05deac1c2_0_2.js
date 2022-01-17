function(start, count) {
        let currentPos = 0;
        for (let k = 0; k < this._thumbnails.length; k++) {
            let thumbnail = this._thumbnails[k];

            if (thumbnail.state > ThumbnailState.NORMAL)
                continue;

            if (currentPos >= start && currentPos < start + count)
                this._setThumbnailState(thumbnail, ThumbnailState.REMOVING);

            currentPos++;
        }
        
        // for simplicity, assume workspaces are removed one at a time
        this._thumbnails[this._kbThumbnailIndex].showKeyboardSelectedState(false);
        if (start < this._kbThumbnailIndex) {
            --this._kbThumbnailIndex;
        }
        if (start === this._kbThumbnailIndex) {
            if (this._kbThumbnailIndex === this._thumbnails.length - 1) {
                --this._kbThumbnailIndex;
            }
        }

        this._queueUpdateStates();
    }