function(){
            var _self = this;

            var mnuHelp = new apf.menu();

            this.nodes.push(
                menus.addItemByPath("Help/", mnuHelp, 100000)
            );


            var c = 0;
            menus.addItemByPath("Help/About", new apf.item({ onclick : function(){ _self.showAbout(); }}), c += 100);
            menus.addItemByPath("Help/~", new apf.divider(), c += 100);
            menus.addItemByPath("Help/Documentation", new apf.item({ onclick : function(){ window.open('http://support.cloud9ide.com/forums') }}), c += 100);
            var mnuChangelog = menus.addItemByPath("Help/Changelog", new apf.item({ onclick : function(){ window.open('http://c9.io/site/tag/changelog/') }}), c += 100);
            ide.addEventListener("hook.ext/quickstart/quickstart", function(c, e) {
                menus.addItemByPath("Help/Quick Start", new apf.item({ onclick : function(){ e.ext.launchQS(); }}), c);
            }.bind(this, c += 100));
            ide.addEventListener("hook.ext/guidedtour/guidedtour", function(c, e) {
                menus.addItemByPath("Help/Take a Guided Tour", new apf.item({ onclick : function(){ e.ext.launchGT(); }}), c);
            }.bind(this, c += 100));
            menus.addItemByPath("Help/~", new apf.divider(), c += 100);
            ide.addEventListener("hook.ext/keybindings_default/keybindings_default", function(c, e) {
                menus.addItemByPath("Help/Keyboard Shortcuts", new apf.item({ onclick : function(){ e.ext.keybindings(); }}), c);
            }.bind(this, c += 100));
            menus.addItemByPath("Help/~", new apf.divider(), c += 100);
            menus.addItemByPath("Help/Support/", null, c += 100);
            menus.addItemByPath("Help/~", new apf.divider(), c += 100);
            menus.addItemByPath("Help/Learning/", null, c += 100);
            menus.addItemByPath("Help/~", new apf.divider(), c += 100);
            menus.addItemByPath("Help/Get in Touch/", null, c += 100);

            c = 0;
            menus.addItemByPath("Help/Support/FAQ", new apf.item({ onclick : function(){ window.open('http://support.cloud9ide.com/forums/20346041-frequently-asked-questions'); }}), c += 100);
            menus.addItemByPath("Help/Support/Troubleshooting Tips", new apf.item({ onclick : function(){ window.open('http://support.cloud9ide.com/forums/20329737-troubleshooting') }}), c += 100);
            menus.addItemByPath("Help/Support/~", new apf.divider(), c += 100);
            menus.addItemByPath("Help/Support/Report a bug", new apf.item({ onclick : function(){ window.open('https://github.com/ajaxorg/cloud9/issues?milestone=1') }}), c += 100);

            c = 0;
            menus.addItemByPath("Help/Learning/YouTube Channel for Cloud9 IDE", new apf.item({ onclick : function(){ window.open('http://www.youtube.com/user/c9ide/videos?view=pl'); }}), c += 100);

            c = 0;
            menus.addItemByPath("Help/Get in Touch/Blog for Cloud9", new apf.item({ onclick : function(){ window.open('http://cloud9ide.posterous.com/'); }}), c += 100);
            menus.addItemByPath("Help/Get in Touch/Twitter (for Cloud9 IDE support)", new apf.item({ onclick : function(){ window.open('https://twitter.com/#!/C9Support'); }}), c += 100);
            menus.addItemByPath("Help/Get in Touch/Twitter (for general Cloud9 tweets)", new apf.item({ onclick : function(){ window.open('https://twitter.com/#!/cloud9ide'); }}), c += 100);
            menus.addItemByPath("Help/Get in Touch/Facebook for Cloud9", new apf.item({ onclick : function(){ window.open('https://www.facebook.com/Cloud9IDE'); }}), c += 100);

            if (window.cloud9config.hosted) {
                mnuHelp.addEventListener("prop.visible", function(e) {
                    if (e.value) {
                        var blogURL = window.location.protocol + "//" + window.location.host + "/site/?json=get_tag_posts&tag_slug=changelog";

                        var response = apf.ajax(blogURL, {
                            method: "GET",
                            contentType: "application/json",
                            async: true,
                            data: JSON.stringify({
                                agent: navigator.userAgent,
                                type: "C9 SERVER EXCEPTION"
                            }),
                            callback: function( data, state) {
                                if (state == apf.SUCCESS) {
                                    if (data !== undefined) {
                                        var jsonBlog = JSON.parse(data);
                                        var latestDate = jsonBlog.posts[0].date;

                                        mnuChangelog.setAttribute("caption", mnuChangelog.caption + " (" + latestDate.split(" ")[0].replace(/-/g, ".") + ")");
                                    }
                                }
                            }
                        });

                        mnuHelp.removeEventListener("prop.visible", arguments.callee);
                    }
                });
            }
        }