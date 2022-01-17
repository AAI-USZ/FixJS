function(name) {
            var item = this._itemsByName[name],
                source = item && item.source;
            if (source)
            {
                if (source.fn)
                {
                    var args = source.args ? source.args.concat(source) : [source];

                    source.fn.apply(source.scope || this, args);
                }
                else if (source.show)
                {
                    scene().showView(source.show, source.args);
                }
                else if (source.action)
                {
                    var root = this.getComponentRoot(),
                        active = root && root.active,
                        method = active && active[source.action],
                        args = source.args ? source.args.concat(source) : [source];

                    if (typeof method === 'function') method.apply(active, args);
                }
                else if (source.publish)
                {
                    var args = source.args
                        ? [source.publish].concat(source.args, source)
                        : [source.publish, source];

                    topic.publish.apply(topic, args);
                }
            }
        }