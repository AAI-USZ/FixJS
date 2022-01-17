function (elements, notify /* Used for the add undo */) {

            if (this.deleteDelegate && (typeof this.deleteDelegate.handleDelete === 'function')) {
                return this.deleteDelegate.handleDelete();
                // this.handleDelete.call(deleteDelegate);
            }

            if (Array.isArray(elements)) {
                elements = Array.prototype.slice.call(elements, 0);
                elements.forEach(function (element) {
                    ElementController.removeElement(element);
                });
            } else {
                ElementController.removeElement(elements);
            }

            var undoLabel = "add element";

            document.application.undoManager.add(undoLabel, this.addElements, this, elements, null, notify);

            this.application.ninja.currentDocument.model.needsSave = true;

            NJevent("elementsRemoved", elements);
        }