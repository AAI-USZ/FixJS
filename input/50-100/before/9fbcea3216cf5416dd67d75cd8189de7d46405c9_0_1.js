function(nmp) {

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

                }