function() {
            var transStr = '-webkit-transform';

            this.mediaInput.value = this._source.media.mediaText;

            if(this.editing) {
                this.editView.classList.add('expanded');
                this.editView.style.setProperty(transStr, 'translate3d(-'+ this._translateDistance + 'px,0,0)');
            } else {
                this.editView.classList.remove('expanded');
                this.editView.style.removeProperty(transStr);
            }

            if(this.default) {
                this._element.classList.add('default-style-sheet');
            } else {
                this._element.classList.remove('default-style-sheet');
            }

            if(this.dirty) {
                this.nameText.element.classList.add('ss-dirty');
            } else {
                this.nameText.element.classList.remove('ss-dirty');
            }

            if(this.disabled) {
                this.element.classList.add('ss-disabled');
            } else {
                this.element.classList.remove('ss-disabled');
            }

        }