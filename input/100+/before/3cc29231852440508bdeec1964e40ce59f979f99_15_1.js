function (elements, rules, notify) {
            if (Array.isArray(elements)) {
                elements.forEach(function (element) {
                    ElementController.addElement(element, rules);
                    element.elementModel.props3D.init(element, false);
                });
            } else {
                ElementController.addElement(elements, rules);
                elements.elementModel.props3D.init(elements, false);

            }

            if (this.addDelegate && typeof (this.addDelegate['onAddElements']) === "function") {
                this.addDelegate['onAddElements'].call(this.addDelegate, elements);
            }

            var undoLabel = "add element";

            document.application.undoManager.add(undoLabel, this.removeElements, this, elements, notify);

            this.application.ninja.currentDocument.model.needsSave = true;

            if (notify || notify === undefined) {
                NJevent("elementAdded", elements);
            }
        }