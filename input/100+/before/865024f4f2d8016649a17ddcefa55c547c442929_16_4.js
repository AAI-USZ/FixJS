function(event) {
            var target = event.target,
                element = this.element;

            if (target.classList.contains("montage-resizer-handle")) {
                if (window.Touch) {
                    this._observePointer(target.id);
                    document.addEventListener("touchmove", this);
                    document.addEventListener("touchend", this);
                } else {
                    this._observePointer("mouse");
                    document.addEventListener("mousemove", this);
                    document.addEventListener("mouseup", this);
                }

                this._resizerFrameInfo = {
                    width: element.clientWidth,
                    height: element.clientHeight,
                    left: parseInt(element.style.left, 10),
                    top: parseInt(element.style.top, 10),
                    ratio: element.clientWidth / element.clientHeight
                };
                this._cursorPosition = {x:event.pageX, y:event.pageY};
                this._draggedElement = target;

                event.preventDefault();
                event.stopPropagation();
            }
        }