function() {

                // only run the function when all binders have completed
                bindersComplete += 1;
                if (bindersComplete < totalBinders) {
                    return;
                }

                // now that all binders have been initialized and accounted
                // for...

                // first, we must create the MojitClient's state of the binders
                // before binding, in case the binders' bind() function tries to
                // do anything that includes children
                Y.Array.each(newMojitProxies, function(item) {
                    var proxy = item.proxy,
                        children = item.children;

                    // 'me' here is the MojitoClient instance.
                    me._mojits[proxy._viewId] = {
                        proxy: proxy,
                        children: children
                    };
                });

                // now we'll loop through again and do the binding, saving the
                // handles
                Y.Array.each(newMojitProxies, function(item) {
                    var mojit = me._mojits[item.proxy.getId()],
                        proxy = item.proxy;

                    mojit.handles = bindNode(proxy._binder, proxy._node,
                        proxy._element);
                });

                // if there is a parent to add a child to (and a topmost child
                // to add to the parent), add new top level child to parent that
                // dispatched it
                if (parentId && topLevelMojitViewId) {
                    parent = me._mojits[parentId];
                    topLevelMojitObj = binderMap[topLevelMojitViewId];
                    // this is just a shallow representation of the child, not
                    // the proxy object itself. but it is enough to look up the
                    // proxy when necessary.
                    if (parent && topLevelMojitObj) {
                        if (!parent.children) {
                            parent.children = {};
                        }
                        parent.children[topLevelMojitViewId] = {
                            type: topLevelMojitObj.type,
                            viewId: topLevelMojitViewId
                        };
                    }
                }
                Y.mojito.perf.mark('mojito', 'core_binders_resume');
                me.resume();
                Y.mojito.perf.mark('mojito', 'core_binders_end');
                fireLifecycle('post-attach-binders', {});
            }