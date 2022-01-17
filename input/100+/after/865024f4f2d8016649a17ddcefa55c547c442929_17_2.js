function() {
            var editorElement = this.element,
                editorInnerElement,
                contents,
                content,
                contentChanged,
                prevValue,
                descriptor,
                i;

            if (this._needsAssingValue || this._needsAssignOriginalContent) {
                editorInnerElement = this._innerElement = editorElement.querySelector(".montage-Editor");

                if (this._contentInitialized) {
                    // if the content has been already initialized, we need replace it by a clone of itself
                    // in order to reset the browser undo stack
                    editorElement.replaceChild(editorInnerElement.cloneNode(true), editorInnerElement);
                    editorInnerElement = this._innerElement = editorElement.querySelector(".montage-Editor");

                    //JFD TODO: Need to clear entries in the Montage undoManager queue
                }

                editorInnerElement.setAttribute("contenteditable", (this._readOnly ? "false" : "true"));
                editorInnerElement.classList.add("editor-" + this._uniqueId);
                editorInnerElement.innerHTML = "";

                if (this._needsAssingValue) {
                    // Set the contentEditable value
                    if (this._value && !this._dirtyValue) {
                        editorInnerElement.innerHTML = this._value;
                    } else if (this._textValue && !this._dirtyTextValue) {
                        if (editorInnerElement.innerText) {
                            editorInnerElement.innerText = this._textValue;
                        } else {
                            editorInnerElement.textContent = this._textValue;
                        }
                    }
                } else if (this._needsAssignOriginalContent) {
                    contents = this.originalContent;
                    contentChanged = false;
                    if (contents instanceof Element) {
                        editorInnerElement.appendChild(contents);
                        contentChanged = true;
                    } else {
                        for (i = 0; contents && (content = contents[i]); i++) {
                            editorInnerElement.appendChild(content);
                            contentChanged = true;
                        }
                    }
                    if (contentChanged) {
                        // Clear the cached value in order to force an editorChange event
                        this._dirtyValue = true;
                        this._dirtyTextValue = true;
                    }
                }

                this._adjustPadding();
                this.markDirty();

                this._needsAssingValue = false;
                this._needsAssignOriginalContent = false;
                this._contentInitialized = true;

                this._setCaretAtEndOfContent = true;
                if (this.hasFocus) {
                    // Call focus to move caret to end of document
                    this.focus();
                }

            } else {
                editorInnerElement = this._innerElement;
            }

            if (this._readOnly) {
                editorInnerElement.setAttribute("contentEditable", "false");
                editorElement.classList.add("readonly")
            } else {
                editorInnerElement.setAttribute("contentEditable", "true");
                editorElement.classList.remove("readonly")
            }
        }