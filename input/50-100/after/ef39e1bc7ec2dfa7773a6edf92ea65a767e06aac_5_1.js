function(cfg, ctx){
        this.driver = $data.mongoDBDriver;
        this.context = ctx;
        this.providerConfiguration = $data.typeSystem.extend({
            dbCreation: $data.storageProviders.mongoDB.DbCreationType.Default,
            address: '127.0.0.1',
            port: 27017,
            serverOptions: {},
            databaseName: 'test'
        }, cfg);
    }