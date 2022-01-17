function(cfg){
            this.initCfg(cfg);
            this.bindAll('search','doSearch','dataDispatch');

            this.registerEvents();
        }