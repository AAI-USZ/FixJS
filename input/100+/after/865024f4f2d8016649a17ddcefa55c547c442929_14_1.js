function() {
            var t = this.element;

            if (!this._valueSyncedWithInputField) {
                this._setElementValue(this.converter ? this.converter.convert(this._value) : this._value);
            }

            if (this._readOnly) {
                t.setAttribute('readonly', 'readonly');
            } else {
                t.removeAttribute('readonly');
            }

            if (this.error) {
                t.classList.add('montage--invalid-text');
                t.title = this.error.message || '';
            } else {
                t.classList.remove("montage--invalid-text");
                t.title = '';
            }

            this._drawSpecific();
        }