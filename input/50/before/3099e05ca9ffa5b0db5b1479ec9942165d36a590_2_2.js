function(cfg){
            this.initCfg(cfg);
            this.rootNode = this.getNode('ui-paging');

            this.bindAll('changeSize', 'paginate');

            //this.render();
        }