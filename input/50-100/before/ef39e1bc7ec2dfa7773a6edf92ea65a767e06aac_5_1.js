function(cfg, ctx){
        if (typeof module === 'undefined'){
            Guard.raise('mongoDB provider not supported on client side. node.js required!', 'Not supported!');
        }
        
        this.driver = require('mongodb');
        this.context = ctx;
        this.providerConfiguration = $data.typeSystem.extend({
            dbCreation: $data.storageProviders.mongoDB.DbCreationType.Default,
            address: '127.0.0.1',
            port: 27017,
            serverOptions: {},
            databaseName: 'test'
        }, cfg);
    }