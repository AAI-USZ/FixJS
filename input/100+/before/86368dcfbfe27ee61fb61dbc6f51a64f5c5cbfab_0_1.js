function(item) {
            var customizationSet = customizations(),
                layout = customizationSet.apply(customizationSet.toPath(this.customizationSet, null, this.id), this.createLayout());

            this.item = this.processItem(item);

            this._processLayout(layout, this.item);

            domClass.remove(this.domNode, 'is-loading');

            /* this must take place when the content is visible */
            this.onContentChange();
        }