function(evt, node) {
            var name = node && domAttr.get(node, 'data-tool'),
                item = name && this._itemsByName[name];
            if (item)
            {
                var context = this.get('context'),
                    scope = item.scope || context || this,
                    args = utility.expand(item, item.args, context, item) || [];

                if (item.fn)
                {
                    item.fn.apply(scope, args.concat(item));
                }
                else if (item.show)
                {
                    scene().showView(item.show, args);
                }
                else if (item.action)
                {
                    var method = scope && scope[item.action];

                    if (typeof method === 'function') method.apply(scope, args.concat(item));
                }
                else if (item.publish)
                {
                    topic.publish.apply(topic, [item.publish].concat(args, item));
                }
            }
        }