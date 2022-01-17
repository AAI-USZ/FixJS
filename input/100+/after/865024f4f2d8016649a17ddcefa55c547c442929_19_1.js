function() {
            Object.getPrototypeOf(TextInput).draw.call(this);

            var el = this.element;

            if (!this._valueSyncedWithInputField) {
                this._setElementValue(this.converter ? this.converter.convert(this._value) : this._value);
            }

            if (this.error) {
                el.classList.add('montage--invalid-text');
                el.title = this.error.message || '';
            } else {
                el.classList.remove("montage--invalid-text");
                el.title = '';
            }
        }