function(options)
        {
            var tc = registry.byId("ContentTabs");

            if (!registry.byId(options.tabId)) {

                var pane = new ContentPane({
                    id: options.tabId,
                    title: options.title,
                    href: options.url,
                    ioMethod: xhr.post,
                    ioArgs: {content : options.content},
                    closable: true,
                    refreshOnShow: (cookie("tabRefresh") == 'false') ? false : true,
                    onLoad : function() {
                        pos = array.indexOf(bba.tabs, options.tabId);
                        if (pos == -1) bba.tabs.push(options.tabId);

                        if (registry.byId('login')) return login.show();

                        pattern = /Fatal error/;
                        if (pattern.test(dom.byId(options.tabId).innerHTML)) {
                            txt = dom.byId(options.tabId).innerHTML;
                            dom.byId(options.tabId).innerHTML = '';
                            node = domConstruct.create("pre", {
                                innerHTML: txt
                            }, dom.byId(options.tabId));
                        }
                    },
                    onClose : function() {
                        array.forEach(bba.tabs, function(item, i) {
                            if (item == options.tabId) {
                                bba.tabs.splice(i, 1);
                            }
                        });

                        if (bba.tabs.length > 0) {
                            tc.selectChild(bba.tabs[bba.tabs.length - 1]);
                        }

                        return true;
                    },
                    onDownloadError : function(error) {
                        xhr.post({
                            url: options.url,
                            content: options.content,
                            handleAs: 'text',
                            preventCache: true,
                            error: function(error) {
                                bba.showXhrError(error);
                            }
                        });
                    }
                });

                tc.addChild(pane);
            }

            tc.selectChild(options.tabId);
        }