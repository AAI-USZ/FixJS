function() {
            var element = this.element,
                template = this._templateElement,
                attributes = this.element.attributes,
                attributeName,
                value,
                i,
                attribute;

            // TODO: get a spec for this, what attributes should we merge?
            for (i = 0; (attribute = attributes[i]); i++) {
                attributeName = attribute.nodeName;
                if (attributeName === "id" || attributeName === "data-montage-id") {
                    value = attribute.nodeValue;
                } else {
                    value = (template.getAttribute(attributeName) || "") + (attributeName === "style" ? "; " : " ") +
                        attribute.nodeValue;
                }

                template.setAttribute(attributeName, value);
            }

            if (element.parentNode) {
                element.parentNode.replaceChild(template, element);
            } else {
                console.warn("Warning: Trying to replace element ", element," which has no parentNode");
            }

            this.eventManager.unregisterEventHandlerForElement(element);
            this.eventManager.registerEventHandlerForElement(this, template);
            this._element = template;
            this._templateElement = null;

            // if the DOM content of the component was changed before the
            // template has been drawn then we assume that this change is
            // meant to set the original content of the component and not to
            // replace the entire template with it, that wouldn't make much
            // sense.
            if (this._newDomContent) {
                this._newDomContent = null;
                this._shouldClearDomContentOnNextDraw = false;
            }
        }