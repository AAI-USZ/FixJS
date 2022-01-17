function() {
            var el = this.element;

            var fn = Object.getPrototypeOf(Autocomplete).draw;
            fn.call(this);

            if (!this._valueSyncedWithInputField) {
                if(this.tokens) {
                    this.value = this.tokens.join(this.separator);
                }
                if(this.value && this.value.charAt(this.value.length-1) != this.separator) {
                    this.value += this.separator;
                }
                this.element.value = this.value;
                this._valueSyncedWithInputField = true;
            }
            var showPopup = this.showPopup;
            if(this.value === '') {
                showPopup = false;
            }

            if(showPopup) {
                this.popup.show();
                // reset active index
                this.activeItemIndex = 0;
            } else {
                if(this.popup && this.popup.displayed) {
                    this.popup.hide();
                }
            }

            var isLoading = (this.loadingStatus === 'loading');
            this.element.classList[isLoading ? 'add' : 'remove']('montage-Autocomplete--loading');


        }