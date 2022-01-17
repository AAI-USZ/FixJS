function(err, data, meta) {

                if (err) {
                    throw new Error(err);
                }

                /*
                 * The new markup returned from the server has all new DOM ids
                 * within it, but we don't want to use them. Before doing any
                 * DOM stuff, we are going to replace all the new view ids with
                 * our current view ids for this mojit view as well as any
                 * children that have come along for the ride.
                 */

                var idReplacements = {}, // from: to
                    metaBinderViewId,
                    mBinder,
                    freshBinders = {},
                    clientMojitViewId,
                    clientMojit,
                    processMojitChildrenForIdReplacements;

                /*
                 * Recursive function used to walk down the hierarchy of
                 * children in order to replace every view id within the meta
                 * data
                 */
                processMojitChildrenForIdReplacements =
                    function(clientChildren, metaChildren, idRepls) {
                        var metaChild,
                            childMojitProxy,
                            metaSubChildren,
                            slot;

                        if (!metaChildren || !clientChildren) {
                            return;
                        }
                        for (slot in metaChildren) {
                            if (metaChildren.hasOwnProperty(slot)) {
                                metaChild = metaChildren[slot];
                                if (clientChildren && clientChildren[slot]) {
                                    childMojitProxy =
                                        clientChildren[slot].proxy;
                                }
                                if (childMojitProxy) {
                                    metaSubChildren = meta.binders[
                                        metaChild.viewId
                                    ].config.children;
                                    idRepls[metaChild.viewId] =
                                        childMojitProxy.getId();
                                    if (metaSubChildren) {
                                        processMojitChildrenForIdReplacements(
                                            my.mojits[childMojitProxy.getId()].
                                                children,
                                            metaSubChildren,
                                            idRepls
                                        );
                                    }
                                }
                            }
                        }
                    };

                for (clientMojitViewId in my._mojits) {
                    if (my._mojits.hasOwnProperty(clientMojitViewId)) {
                        clientMojit = my._mojits[clientMojitViewId];
                        for (metaBinderViewId in meta.binders) {
                            if (meta.binders.hasOwnProperty(metaBinderViewId)) {
                                mBinder = meta.binders[metaBinderViewId];
                                if (mBinder.instanceId ===
                                        clientMojit.proxy._instanceId) {
                                    Y.log('matched instanceId ' +
                                        mBinder.instanceId,
                                        'debug',
                                        NAME
                                        );
                                    idReplacements[metaBinderViewId] =
                                        clientMojitViewId;
                                    processMojitChildrenForIdReplacements(
                                        my._mojits[clientMojit.proxy.getId()].
                                            children,
                                        mBinder.children,
                                        idReplacements
                                    );
                                }
                            }
                        }
                    }
                }

                Y.Object.each(idReplacements, function(to, from) {
                    var regex = new RegExp(from, 'g');

                    data = data.replace(regex, to);
                });

                setNewMojitView(data, mp);

                // Do a "light bind" for each child, keeping track of any
                // binders that need a "full bind". We'll bind those in the
                // attachBinders call below this loop.
                Y.Object.each(meta.children, function(child, slot) {

                    var childViewId = idReplacements[child.viewId],
                        childMojit = my._mojits[childViewId],
                        childProxy,
                        childNode,
                        childElement,
                        childBinder;

                    // may not be a binder for this mojit child, so there would
                    // be no mojit proxy yet
                    if (!childMojit) {
                        // this must be a new binder instance that we need to
                        // instantiate
                        freshBinders[child.viewId] = meta.binders[child.viewId];
                        return;
                    }

                    childProxy = my._mojits[childViewId].proxy;
                    childNode = mp._node.one('#' + childViewId);
                    childElement = childNode._node;
                    childBinder = childProxy._binder;

                    // set new node and element into the mojit proxy object
                    childProxy._node = childNode;
                    childProxy._element = childElement;

                    if (Y.Lang.isFunction(childBinder.onRefreshView)) {
                        childBinder.onRefreshView(childNode, childElement);
                    } else if (Y.Lang.isFunction(childBinder.bind)) {
                        childBinder.bind(childNode, childElement);
                    }
                });

                // Do a "full bind" on the new binders we tracked in the loop
                // above. These need the full treatment.
                my.attachBinders(freshBinders);

                if (cb) {
                    cb(data, meta);
                }
            }