function(store, cfg) {
        var binder = this, 
        proxy = store.getProxy(),
        reader = null, writer=null,
        url = cfg.proto+'://'+cfg.host+':'+cfg.port+'/'+cfg.url;
        if (proxy && cfg.keepreader) reader = proxy.getReader();
        if (proxy && cfg.keepwriter) writer = proxy.getWriter();
        if (!reader) reader = {type:'json', root:'data'};
        if (!writer && !cfg.rdonly) writer = {type:'json', root:'data', writeAllFields:false, allowSingle:false};

        var api={read:url+'&_act=read'};
        if (!cfg.rdonly){
            api.create = url+'&_act=create';
            api.update = url+'&_act=update';
            api.destroy = url+'&_act=destroy';
        }
        //for progress indicator
        store.on('write', binder.processWrite, binder, cfg);
        store.on('load', binder.processLoad, binder, cfg);
        //don't use this, will skip fire 'write' event(suspend)
        //if you wan't to use this, need add callback on operation!
        //store.batchUpdateMode = 'complete';
        store.setProxy({
            type: 'jsonp',
            timeout: cfg.timeout||300000,
            //batchActions: false,
            api: cfg.api?cfg.api:api,
            url: cfg.proto+'://'+cfg.host+':'+cfg.port+'/'+cfg.url,
            reader: cfg.reader?cfg.reader:reader,
            encodeRecords: binder.encodeRecords,
            //we need the input callback/scope to saved in reqeuest, so overwrite!
            createRequestCallback: binder.createRequestCallback,
            destroy: binder.doProxyDestroy,
            writer: cfg.writer?cfg.writer:writer
        });
        //for progress indicator
        store.getProxy().on('exception', binder.processErrors, binder, cfg);
        store.reloadParams = cfg.loadparams?cfg.loadparams:{};
        if (store.autoLoad||cfg.autoload){
            var params = Ext.applyIf({}, store.reloadParams);
            //store.load({params:params});
            if (cfg.deferload)
            Ext.defer(store.load, 200, store, [{params:params}]);
            else
            store.load({params:params});
            cfg.autoloaded = true;
        }

    }