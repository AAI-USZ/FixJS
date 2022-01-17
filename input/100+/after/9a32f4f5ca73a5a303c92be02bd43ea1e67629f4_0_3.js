function() {
        var sinon = sinonObject;
        var stubContext = {
            session: null,
            clientRequest: null,
        };
        var context = {
            /**
             * Not a factory method.
             */
            getStubContext: function() {
                return stubContext;
            },

            /**
             * A factory method for MessageSession stub object.
             */
            stubMessageSession: function() {
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
            },

            /**
             * A factory method for ClientRequest stub object.
             *
             * @param Array clientAlerts
             * @param object:stubDevInfo() devInfo
             * @param object:stubDmJob() dmJob
             * @return object (ClientRequest)
             */
            stubClientRequest: function(clientAlerts, devInfo, dmJob) {
                return {
                    // An Association Array
                    clientAlerts: clientAlerts,
                    devInfo: devInfo,
                    dmJob: dmJob,
                };
            },

            /**
             * A factory method for DevInfo stub object.
             *
             * @param String deviceId
             * @param String manufacturer
             * @param String model
             * @param String dmVersion
             * @param String language
             * @return object (DevInfo)
             */
            stubDevInfo: function(deviceId, manufacturer, model, dmVersion, language) {
                return sinon.stub({
                    deviceId: deviceId,
                    manufacturer: manufacturer,
                    model: model,
                    dmVersion: dmVersion,
                    language: language,
                });
            },

            /**
             * A factory method for DmJob stub object.
             *
             * @param object arguments
             * @return object (DmJob)
             */
            stubDmJob: function(arguments) {
                return sinon.stub({
                    uid: null,
                    activateTimestamp: null,
                    createTimestamp: null,
                    expiredTimestamp: null,
                    startTimestamp: null,
                    deviceId: null,
                    notificationType: null,
                    notificationUri: null,
                    postedBy: null,
                    pushAddress: null,
                    pushAddressType: null,
                    pushType: null,
                    regionCode: null,
                    serviceId: null,
                    sessionId: null,
                    status: null,
                    arguments: arguments
                });
            },

            /**
             * A factory method for ClientAlert stub object.
             *
             * @param String data
             * @return object (ClientAlert)
             */
            stubClientAlert: function(data) {
                var stub = sinon.stub({
                    isGenericAlert: function() {},
                });
                stub.data = data;
                return stub;
            },

            /**
             * A factory method for ItemData stub object.
             *
             * @param String status
             * @return object (ItemData)
             */
            stubItemData: function(status) {
                return sinon.stub({
                    status: status,
                });
            }
        };
        // Overwrite the default init() method.
        exports.init = function() {
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
        };
        return context;
    }