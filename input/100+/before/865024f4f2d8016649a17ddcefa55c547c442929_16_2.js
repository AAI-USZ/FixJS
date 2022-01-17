function() {
            var element = this.element,
                target = this.target,
                editorElement = this._editor.innerElement,
                style;

            if (this._needsReset) {
                var offsetLeft,
                    offsetTop,
                    _findOffset = function(node) {
                        offsetTop = node.offsetTop;
                        offsetLeft = node.offsetLeft;

                        while ((node = node.offsetParent) && node != editorElement) {
                            offsetTop += node.offsetTop;
                            offsetLeft += node.offsetLeft;
                        }
                    };
                _findOffset(target);

                // Initialize the resizer
                style = element.style;

                style.width = target.offsetWidth + "px";
                style.height = target.offsetHeight + "px";
                style.top = offsetTop + "px";;
                style.left = offsetLeft + "px";

                this._editor.innerElement.classList.remove("montage-editor-resizing");
                target.classList.add("montage-resizer-element");

                // Setup the image
                this.image.src = target.src;
                this.image.title = target.title;
                this.image.alt = target.alt;

                // Select the resizedElement
                this._selectElement(target);

                this._needsReset = false;
            }

            if (this._draggedElement) {
                // Resize the resizer
                var zero = Point.create().init(0, 0),
                    framePosition = dom.convertPointFromNodeToPage(element, zero),
                    cursor = this._cursorPosition,
                    direction = this._draggedElement.getAttribute("data-montage-id").substring("montage-resizer-handle-".length),
                    info = this._resizerFrameInfo,
                    ratio = info.ratio,
                    height = parseFloat(element.style.height, 10),
                    width = parseFloat(element.style.width, 10),
                    top = parseFloat(element.style.top, 10),
                    left = parseFloat(element.style.left, 10),
                    minSize = 15;

                this._editor.innerElement.classList.add("montage-editor-resizing");

                if (direction == "n") {
                    height += framePosition.y - cursor.y;
                    top = info.top - (height - info.height);
                } else if (direction == "ne") {
                    height += framePosition.y - cursor.y;
                    width = Math.round(height * ratio);
                    if (cursor.x > (framePosition.x + width)) {
                        width = cursor.x - framePosition.x;
                        height = Math.round(width / ratio);
                    }
                    top = info.top - (height - info.height);
                } else if (direction == "e") {
                    width = cursor.x - framePosition.x;
                } else if (direction == "se") {
                    height = cursor.y - framePosition.y;
                    width = Math.round(height * ratio);
                    if (cursor.x > (framePosition.x + width)) {
                        width = cursor.x - framePosition.x;
                        height = Math.round(width / ratio);
                    }
                } else if (direction == "s") {
                    height = cursor.y - framePosition.y;
                } else if (direction == "sw") {
                    height = cursor.y - framePosition.y;
                    width = Math.round(height * ratio);
                    if (cursor.x <= framePosition.x - width + element.clientWidth) {
                        width = element.clientWidth + framePosition.x - cursor.x;
                        height = Math.round(width / ratio);
                    }
                    left = info.left - (width - info.width);
                } else if (direction == "w") {
                    width += framePosition.x - cursor.x;
                    left = info.left - (width - info.width);
                } else if (direction == "nw") {
                    height += framePosition.y - cursor.y;
                    width = Math.round(height * ratio);
                    if (cursor.x <= framePosition.x - width + element.clientWidth) {
                        width = element.clientWidth + framePosition.x - cursor.x;
                        height = Math.round(width / ratio);
                    }
                    top = info.top - (height - info.height);
                    left = info.left - (width - info.width);
                }

                //set the frame's new height and width
                if (height > minSize && width > minSize) {
                    element.style.height = height + "px";
                    element.style.width = width + "px";
                    element.style.top = top + "px";
                    element.style.left = left + "px";
                }
            }

            if (this._finalizeDrag) {
                width = element.clientWidth;
                height = element.clientHeight;

                this._editor.innerElement.classList.remove("montage-editor-resizing");
                target.classList.remove("montage-resizer-element");
                if (target.classList.length == 0) {
                    target.removeAttribute("class");
                }

                // Select the resizedElement (just in case)
                this._selectElement(target);

                // Take the element offline to modify it
                var div = document.createElement("div"),
                    offlineElement,
                    savedID;
                div.appendChild(target.cloneNode(true));
                offlineElement = div.firstChild;

                // Resize the element now that it's offline
                offlineElement.width = width;
                offlineElement.height = height;
                offlineElement.style.removeProperty("width");
                offlineElement.style.removeProperty("height");

                savedID = offlineElement.id;
                offlineElement.id = "montage-editor-resized-image";

                // Inject the resized element into the contentEditable using execCommand in order to be in the browser undo queue
                this._editor.execCommand("inserthtml", false, div.innerHTML, "Resizing Image");
                target = document.getElementById(offlineElement.id);
                if (target) {
                    if (savedID !== undefined && savedID !== "") {
                        target.id = savedID;
                    } else {
                        target.removeAttribute("id");
                    }

                    // Add back the resizer
                    this.target = target;
                    this._needsReset = true;
                    this.needsDraw = true;
                }

                this._finalizeDrag = false;
            }
        }