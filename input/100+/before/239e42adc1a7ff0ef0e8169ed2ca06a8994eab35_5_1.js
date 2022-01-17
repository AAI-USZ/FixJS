function() {
            var defs = [];

            phpr.nls = new phpr.translator();
            defs.push(phpr.nls.loadTranslation(phpr.language));
            defs.push(phpr.nls.loadFallback("en"));

            phpr.DataStore.addStore({ url: phpr.globalModuleUrl});
            defs.push(phpr.DataStore.requestData({ url: phpr.globalModuleUrl }));

            phpr.DataStore.addStore({ url: phpr.tree.getUrl() });
            defs.push(phpr.DataStore.requestData({ url: phpr.tree.getUrl() }));

            var tabStore = new phpr.Default.System.Store.Tab();
            defs.push(tabStore.fetch());

            this.userStore = new phpr.Default.System.Store.User();
            defs.push(this.userStore.fetch());

            var defList = new dojo.DeferredList(defs);

            defList.addCallback(dojo.hitch(this, function() {
                var isAdmin = phpr.DataStore.getMetaData({url: phpr.globalModuleUrl}) == "1" ? true : false;
                phpr.isAdminUser = isAdmin;

                translatedText = phpr.nls.get("Disable Frontend Messages");
                view.disableFrontendMessage.set('label', translatedText);

                phpr.tree.loadTree();
                this.addLogoTooltip();
                this.setGlobalModulesNavigation();
                this._monitorLanguageChange();

                this._setTutorialButton();
                this._maybeShowTutorial();

                phpr.pageManager.init();
                phpr.InitialScreen.end();
            }));
        }