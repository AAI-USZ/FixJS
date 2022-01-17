function() {
            var contentNode = this._innerElement,
                content = "",
                overlayElement = null,
                overlayParent,
                overlayNextSibling;

            if (this._dirtyTextValue && !this._textValue_locked) {
                this._textValue_locked = true;

                if (contentNode) {
                    // Temporary orphan the overlay slot in order to retrieve the content
                    overlayElement = contentNode.querySelector(".montage-editor-overlay");
                    if (overlayElement) {
                        overlayParent = overlayElement.parentNode;
                        overlayNextSibling = overlayElement.nextSibling;
                        overlayParent.removeChild(overlayElement);
                    }

                    content = this._innerText(contentNode);

                     // restore the overlay
                    if (overlayElement) {
                        overlayParent.insertBefore(overlayElement, overlayNextSibling);
                    }
                }

                if (this._textValue != content) {
                    this.dispatchPropertyChange("textValue", function(){
                        this._textValue = content;
                    });
                }

                this._dirtyTextValue = false;
                this._textValue_locked = false;
            }
            return this._textValue;
        }