function(event) {
            var target = event.target,
                previousTarget = this.target;

            // Ignore this call if we are curently capturing the pointer
            if (this._observedPointer) {
                return true;
            } else {
                if (target === this.element && this._editor.activeOverlay == this) {
                    this._editor.hideOverlay();
                    // We need to stop the event propagation to prevent the selection to be reset
                    event.target = this.target;     // Retarget the event
                    event.preventDefault();
                    event.stopPropagation();
                } else if (target.tagName === "IMG") {
                    if (target !== previousTarget) {
                        if (previousTarget) {
                            previousTarget.classList.remove("montage-resizer-element");
                            if (previousTarget.classList.length == 0) {
                                previousTarget.removeAttribute("class");
                            }
                        }
                        this.target = target;
                        this._needsReset = true;
                        if (this._isActive) {
                            this.needsDraw = true;
                        } else {
                            this._ignoreNextSelectionchanged = true;
                            this._editor.showOverlay(this);
                        }
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    return true;
                } else if (this._editor.activeOverlay == this) {
                    this._editor.hideOverlay();
                }
            }

            return false;
        }