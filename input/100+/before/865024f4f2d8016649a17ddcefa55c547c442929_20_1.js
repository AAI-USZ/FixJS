function() {
            var wasEditing = this._element.classList.contains("montage-text-slider-editing");

            if (this._isEditing) {
                // if we're entering the editing state...
                if (!wasEditing) {
                    // ...add the class and focus the input
                    this._element.classList.add("montage-text-slider-editing");
                    this._inputElement.focus();
                }

                this._inputElement.value = this.convertedValue + ((this._unit) ? " " + this._unit : "");
            } else if (wasEditing) {
                // remove class list, blur the input element and focus the
                // TextSlider for further editing
                this._element.classList.remove("montage-text-slider-editing");
                this._inputElement.blur();
                this._element.focus();
            }

            if (this._direction === "horizontal") {
                document.body.style.cursor = "ew-resize";
            } else if (this._direction === "vertical") {
                document.body.style.cursor = "ns-resize";
            } else {
                document.body.style.cursor = "auto";
            }

        }