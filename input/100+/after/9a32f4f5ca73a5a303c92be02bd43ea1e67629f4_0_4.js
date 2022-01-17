function() {
            var blocks = [];
            var tokens = [];

            function prepare(token, block) {
                if (block) {
                    console.log('token-->' + token);
                    blocks.push(block);
                    tokens.push(token);
                }
                return token;
            }
            var stub = stubContext.session;
            stubContext.session = {
                querySingleton: function(type, block) {
                    return prepare(stub.querySingleton(type, block), block);
                },
                queryByUid: function(type, uid, block) {
                    return prepare(stub.queryByUid(type, uid, block), block);
                },
                query: function(type, block) {
                    return prepare(stub.query(type, block), block);
                },
                queryUids: function(type, block) {
                    return prepare(stub.queryUids(type, block), block);
                },
                queryCount: function(type, block) {
                    return prepare(stub.queryCount(type, block), block);
                },
                updateSingletonField: function(type, fieldName, fieldValue, block) {
                    return prepare(stub.updateSingletonField(type, fieldName, fieldValue, block), block)
                },
                updateField: function(type, uid, fieldName, fieldValue, block) {
                    return prepare(stub.updateField(type, uid, fieldName, fieldValue, block), block);
                },
                updateSingleton: function(type, entity, block) {
                    return prepare(stub.updateSingleton(type, entity, block), block);
                },
                update: function(type, uid, entity, block) {
                    return prepare(stub.update(type, uid, entity, block), block);
                },
                insert: function(type, uid, entity, block) {
                    return prepare(stub.insert(type, uid, entity, block), block);
                },
                remove: function(type, uid, block) {
                    return prepare(stub.remove(type, uid, block), block);
                },
                runSingleton: function(type, operationName, data, block) {
                    return prepare(stub.runSingleton(type, operationName, data, block), block);
                },
                run: function(type, uid, operationName, data, block) {
                    return prepare(stub.run(type, uid, operationName, data, block), block)
                },
                setWaitingForResultNotification: function(tf) {
                    return stub.setWaitingForResultNotification(tf);
                },
                notifySync: function(entity, block) {
                    return stub.notifySync(entity, block);
                },
                notifyAsync: function(entity) {
                    return stub.notifyAsync(entity);
                },
                fetchUrlSync: function(url, params, block) {
                    return stub.fetchUrlSync(url, params, block);
                },
                commit: function(commitState, block) {
                    var result = stub.commit(commitState, block);
                    for (var i = 0; i < blocks.length; i++) {
                        if (blocks[i]) {
                            blocks[i](result[tokens[i]]);
                        }
                    }
                    if (block) {
                        block(result);
                    }
                    blocks = [];
                    tokens = [];
                    return result;
                },
                log: function(message) {
                    console.log(message);
                },
            };

            return stubContext;
        }