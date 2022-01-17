function() {
            this.inherited(arguments);

            var child = this.domNode.children[0];
            if (child) domClass.add(child, 'scroll-content');

            var hasTouch = true; //'ontouchstart' in window;
            if (hasTouch)
            {
                this._scroll = new iScroll(this.domNode, {
                    useTransition: true,
                    checkDOMChanges: false,
                    hScrollbar: false,
                    vScrollbar: false
                });
            }
        }