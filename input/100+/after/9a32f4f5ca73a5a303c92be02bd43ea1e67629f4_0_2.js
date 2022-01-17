function() {
                var stub = sinon.stub({
                    querySingleton: function(type, block) {},
                    queryByUid: function(type, uid, block) {},
                    query: function(type, block) {},
                    queryUids: function(type, block) {},
                    queryCount: function(type, block) {},
                    updateSingletonField: function(type, fieldName, fieldValue, block) {},
                    updateField: function(type, uid, fieldName, fieldValue, block) {},
                    updateSingleton: function(type, entity, block) {},
                    update: function(type, uid, entity, block) {},
                    insert: function(type, uid, entity, block) {},
                    remove: function(type, uid, block) {},
                    runSingleton: function(type, operationName, data, block) {},
                    run: function(type, operationName, data, block) {},
                    setWaitingForResultNotification: function(tf) {},
                    commit: function(commitState, block) {},
                    notifySync: function(entity, block) {},
                    notifyAsync: function(entity) {},
                    fetchUrlSync: function(url, params, block) {},
                });

                stub.log = function(message) {
                    console.log(message);
                };
                return stub;
            }