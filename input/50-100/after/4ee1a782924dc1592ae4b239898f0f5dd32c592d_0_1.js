function(item) {
                    var proxy = item.proxy,
                        children = item.children;

                    // 'me' here is the MojitoClient instance.
                    me._mojits[proxy._viewId] = {
                        proxy: proxy,
                        children: children
                    };
                }