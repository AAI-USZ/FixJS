function() {

                // only run the function when all binders have completed
                bindersComplete += 1;
                if (bindersComplete < totalBinders) {
                    return;
                }

                // now that all binders have been initialized and accounted
                // for, save & bind new MojitProxies + children refs
                Y.Array.each(newMojitProxies, function(nmp) {

                    // 'me' here is the MojitoClient instance.
                    var mojits = me._mojits,
                        viewid = nmp.proxy.getId(),
                        binder = nmp.proxy._binder,
                        node = nmp.proxy._node,
                        elem = nmp.proxy._element;

                    mojits[viewid] = { // save
                        proxy: nmp.proxy,
                        children: nmp.children,
                        handles: bindNode(binder, node, elem) // bind
                    };

                    recordBoundMojit(mojits, parentId, viewid, nmp.proxy.type);

                    /*console.log(
                        '• new mp: %o, proxy.type: %s, viewid: %s'
                        , nmp
                        , nmp.proxy.type
                        , nmp.proxy._viewId
                    );*/

                });

                Y.mojito.perf.mark('mojito', 'core_binders_resume');
                me.resume();
                Y.mojito.perf.mark('mojito', 'core_binders_end');
                fireLifecycle('post-attach-binders', {});

                // Y.Object.each(me._mojits, function (mojit, id) {
                //     console.log(
                //         '• id:%s type:%s'
                //         , id
                //         , mojit.proxy.type);
                // });
            }