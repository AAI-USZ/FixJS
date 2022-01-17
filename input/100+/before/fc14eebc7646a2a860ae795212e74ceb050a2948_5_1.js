function(name) {
            var item = this._items[name],
                source = item && item.source;
            if (source)
            {
                if (source.fn)
                {
                    source.fn.call(source.scope || this, source);
                }
                else if (source.action)
                {
                    var root = this.getComponentRoot(),
                        method = root[source.action];

                    if (typeof method === 'function') method.call(root, source);
                }
                else if (source.publish)
                {
                    topic.publish(source.publish, [source]);
                }
            }
        }