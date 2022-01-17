function() {

            if(!this._element.tabIndex) {
                this._element.tabIndex = 0;
            }

            this._element.classList.add("montage-button");
            this._element.setAttribute("aria-role", "button");

            if (!!(this._isElementInput = (this._element.tagName === "INPUT")) && this.value === undefined) {
                this._valueNode = this._element.getAttributeNode("value");
                this.value = this._element.value;
            }
            else {
                if (!this._element.firstChild) {
                    this._element.appendChild(document.createTextNode(""));

                }
                this._valueNode = this._element.firstChild;
                if (this.value === undefined) {
                    this.value = this._valueNode.data;
                }
            }
        }