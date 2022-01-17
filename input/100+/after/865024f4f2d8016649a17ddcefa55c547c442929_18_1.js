function() {
            var contentNode = this._innerElement,
                content = "",
                overlayElement = null,
                overlayParent,
                overlayNextSibling;

            if (this._dirtyValue && !this._value_locked) {
                this._value_locked = true;

                if (contentNode) {
                    // Temporary orphan the overlay slot while retrieving the content
                    overlayElement = contentNode.querySelector(".montage-Editor-overlay");
                    if (overlayElement) {
                        overlayParent = overlayElement.parentNode;
                        overlayNextSibling = overlayElement.nextSibling;
                        overlayParent.removeChild(overlayElement);
                    }
                    content = contentNode.innerHTML;
                }

                if (content == "<br>") {
                    // when the contentEditable div is emptied, Chrome add a <br>, let's filter it out
                    content = "";
                }
                if (this._sanitizer === undefined) {
                    this._sanitizer = Sanitizer.create();
                }
                if (this._sanitizer) {
                    content = this._sanitizer.didGetValue(content, this._uniqueId);
                }

                // restore the overlay
                if (overlayElement) {
                    overlayParent.insertBefore(overlayElement, overlayNextSibling);
                }

                if (this._value != content) {
                    this.dispatchPropertyChange("value", function(){
                        this._value = content;
                    });
                }

                this._dirtyValue = false;
                this._value_locked = false;
            }
            return this._value;
        }