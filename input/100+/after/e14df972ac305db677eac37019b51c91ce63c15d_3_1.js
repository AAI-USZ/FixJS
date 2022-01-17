function() {
        var host = this.get('host'),
            tag = (host.get('tagName') || '').toLowerCase(),
            mixins = [],
            attrs;

        // Look for a registered tag
        if (registered[tag]) {
            attrs = attrs || groupAttrs(host.getDOMNode().attributes);
            mixins.push({obj: registered[tag].mixin, config: attrs.grouped.data});
        }

        if (has_attrs) {
            attrs = attrs || groupAttrs(host.getDOMNode().attributes);
            // Look for a registered attribute
            Y.each(attrs.ungrouped, function(dummy, attr) {
                var selector = '[' + attr + ']';
                if (selector in registered) {
                    mixins.push({obj: registered[selector].mixin, config: attrs.grouped[attr] || {}});
                }
            });
        }

        // Need to add to cached instances to prevent errors when mixins refer
        // other nodes with mixins.
        Y.Node._instances[host._yuid] = host;

        if (mixins.length) {
            Y.Array.each(mixins, function(mixin) {
                Y.mix(this, mixin.obj);

                if (mixin.obj.created) {
                    mixin.obj.created.call(this, mixin.config);
                }
            }, this);
        }
    }