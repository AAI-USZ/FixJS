function(event, widget) {
            var node;
            widget = widget || this;
            if (event) {
                if (event.node && BWidget.isShownInProperty(event.node.getType())
                    && !(event.name === "modelUpdated" &&
                    event.type === "nodeRemoved")) {
                    widget._showProperties(event.node);
                } else {
                    node = ADM.getActivePage();
                    widget._showProperties(node);
                }
            }
        }