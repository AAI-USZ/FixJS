function() {
            var element = this._element,
                childComponents = this.childComponents,
                childComponent;

            this.setupIterationSerialization();
            this.setupIterationDeserialization();
            this._iterationChildComponentsCount = childComponents.length;
            this._iterationChildCount = element.childNodes.length;
            this._iterationChildElementCount = element.children.length;

            if (this._iterationChildComponentsCount > 0) {
                this._templateId = childComponents[0]._suuid || childComponents[0].uuid;
                this._iterationTemplate = Template.templateWithComponent(this);
            } else {
                this._iterationTemplate = Template.create().initWithComponent(this);
            }
            this._iterationTemplate.optimize();
            this._removeOriginalContent = true;

            if (logger.isDebug) {
                logger.debug(this._iterationTemplate.exportToString());
            }

            // just needed to create the iteration Template, so we get rid of it.
            this.removeIterationSerialization();

            while ((childComponent = childComponents.shift())) {
                childComponent.needsDraw = false;
            }

            if (this.objects && (this.objects.length !== this._items.length)) {
                this._updateItems([], this.objects, 0);
            }
        }