function(item) {
            var node = item.domNode;

            domClass.toggle(node, 'is-disabled', !item.enabled);
            domClass.toggle(node, 'is-hidden', !item.visible);
        }