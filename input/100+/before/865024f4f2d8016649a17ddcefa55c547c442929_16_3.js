function() {
            var target = this.target;

            this._isActive = false;

            this.element.removeEventListener(window.Touch ? "touchstart" : "mousedown", this, false);
            window.removeEventListener("resize", this, false);

            if (this._draggedElement) {
                if (window.Touch) {
                    document.removeEventListener("touchmove", this);
                    document.removeEventListener("touchend", this);
                } else {
                    document.removeEventListener("mousemove", this);
                    document.removeEventListener("mouseup", this);
                }
                this._releaseInterest();
            }

            if (target) {
                // Let's do some extra cleanup
                target.classList.remove("montage-resizer-element");
                if (target.classList.length == 0) {
                    target.removeAttribute("class");
                }
                this._editor.markDirty();
            }

            //Reset the resizer internal
            this.target = null;
            this._needsReset = false;
            this._draggedElement = null;
            this._finalizeDrag = false;
        }