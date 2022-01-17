function() {
            this.nameText.element.addEventListener('click', this, false);

            //// Set the initial media text value
            this.mediaText = this._source.media.mediaText;
        }