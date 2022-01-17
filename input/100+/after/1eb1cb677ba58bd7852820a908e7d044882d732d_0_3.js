function ($, fluid) {
    fluid.log("RecordEditor.js loaded");
//
//    // operation = one of "create", "delete", "fetch", "update"
//    var makeDCErrorHandler = function (that) {
//        return function (operation, message, data) {
//            if (data && data.messages) {
//                // TODO: expand this branch as sophistication increases for CSPACE-3142
//                fluid.each(data.messages, function (message) {
//                    that.messageBar.show(message.message, null, data.isError);
//                });
//            } else {
//                var msgKey = operation + "FailedMessage";
//                var msg = that.options.strings[msgKey] + message;
//                that.messageBar.show(fluid.stringTemplate(msg, {
//                    record: that.lookupMessage(that.options.recordType)
//                }), null, true);
//            }
//            that.locate("save").prop("disabled", false);
//            that.events.onError.fire(operation);
//            if (operation === "create") {
//                // This is only temporary until http://issues.collectionspace.org/browse/CSPACE-263
//                // is resolved
//                that.options.applier.requestChange("csid", undefined);
//            }
//        };
//    };
//
//    var validateIdentificationNumber = function (domBinder, container, messageBar, message) {
//        return function () {
//            var required = domBinder.locate("identificationNumber");
//            if (required === container) {
//                return true;
//            }
//            var noId = true;
//            fluid.each(required, function (elem) {
//                if ($.trim($(elem).val()) === "") {
//                    messageBar.show(message, null, true);
//                    noId = false;
//                    return noId;
//                }
//            });
//            return noId;
//        };
//    };
//    
//    var validateRequiredFields = function (domBinder, messageBar, message) {
//        var required = domBinder.locate("requiredFields");
//        var i;
//        for (i = 0; i < required.length; i++) {
//            if (required[i].value === "") {
//                messageBar.show(fluid.stringTemplate(message, {field: cspace.util.findLabel(required[i])}), null, true);
//                return false;
//            }
//        }
//        return true;
//    };
//    
//    var processChanges = function (that, revert) {
//        that.unsavedChanges = revert;
//        that.locate("cancel").prop("disabled", !revert);
//    };
//    
//    var recordSaveHandler = function (that, data, action) {
//        var message = action.toLowerCase() + "SuccessfulMessage";
//        that.options.applier.requestChange("", data);
//        that.refreshView();
//        that.messageBar.show(fluid.stringTemplate(that.options.strings[message], {
//            record: that.lookupMessage(that.options.recordType)
//        }), Date());
//        processChanges(that, false);
//    };
//
//    var bindEventHandlers = function (that) {
//        
//        that.events.onSave.addListener(validateIdentificationNumber(that.dom, that.container, that.messageBar, that.lookupMessage(fluid.stringTemplate("%recordtype-identificationNumberRequired", { recordtype: that.options.recordType }))));
//        
//        that.events.onSave.addListener(function () {
//            return validateRequiredFields(that.dom, that.messageBar, that.options.strings.missingRequiredFields);
//        });
//        
//        that.events.afterRenderRefresh.addListener(function () {
//            clearLocalStorage(that); 
//        });
//        
//        that.applier.modelChanged.addListener("fields", function (model, oldModel, changeRequest) {
//            processChanges(that, true);
//        });
//        
//        that.globalNavigator.events.onPerformNavigation.addListener(function (callback) {
//            if (that.unsavedChanges) {
//                that.confirmation.open("cspace.confirmation.saveDialog", undefined, {
//                    listeners: {
//                        onClose: function (userAction) {
//                            if (userAction === "act") {
//                                that.options.dataContext.events.afterSave.addListener(function () {
//                                    processChanges(that, false);
//                                    callback();
//                                }, undefined, undefined, "last");
//                                that.requestSave(function () {
//                                    
//                                });
//                            } else if (userAction === "proceed") {
//                                that.rollback();
//                                callback();
//                            }
//                        }
//                    },
//                    parentBundle: that.options.parentBundle
//                });
//                return false;
//            }
//        }, that.options.navigationEventNamespace);
//    };
//
//    var setupRecordEditor = function (that) {
//        bindEventHandlers(that);
//        if (!that.options.deferRendering) {
//            that.refreshView();
//        }
//        that.events.afterRenderRefresh.fire(that);
//    };
//    
//    var clearLocalStorage = function (that) {
//        var modelToClone = that.localStorage.get(that.localStorage.options.elPath);
//        if (modelToClone) {
//            that.localStorage.set();
//            processChanges(that, true);
//        }
//    }; 
//    
//    fluid.defaults("cspace.recordEditor", {
//        gradeNames: ["fluid.rendererComponent", "autoInit"],
//        preInitFunction: "cspace.recordEditor.preInit",
//        finalInitFunction: "cspace.recordEditor.finalInit",
//        mergePolicy: {
//            fieldsToIgnore: "replace",
//            "rendererOptions.instantiator": "nomerge",
//            "rendererOptions.parentComponent": "nomerge",
//            "rendererFnOptions.uispec": "uispec",
//            "uispec": "nomerge",
//            "resolver": "nomerge"
//        },
//        components: {
//            messageBar: "{messageBar}",
//            globalNavigator: "{globalNavigator}",
//            recordDataSource: {
//                type: "cspace.recordEditor.dataSource",
//                options: {
//                    recordType: "{cspace.recordEditor}.options.recordType"
//                }
//            },
//            confirmation: {
//                type: "cspace.confirmation"
//            },
//            recordEditorTogglable: {
//                type: "cspace.util.togglable",
//                options: {
//                    selectors: {
//                        header: "{recordEditor}.options.selectors.header",
//                        togglable: "{recordEditor}.options.selectors.togglable"
//                    }
//                }
//            },
//            localStorage: {
//                type: "cspace.util.localStorageDataSource",
//                options: {
//                    elPath: "modelToClone"
//                }
//            },
//            validator: {
//                type: "cspace.validator"
//            },
//            vocab: "{vocab}"
//        },
//        invokers: {
//            lookupMessage: "cspace.util.lookupMessage",
//            rollback: {
//                funcName: "cspace.recordEditor.rollback",
//                args: "{recordEditor}"
//            },
//            requestSave: "cspace.recordEditor.requestSave",
//            remove: "remove",
//            afterDeleteAction: "afterDelete",
//            checkDeleteDisabling: "checkDeleteDisabling", //whether to disable delete button
//            checkCreateFromExistingDisabling: "checkCreateFromExistingDisabling", //whether to disable createFromExisting button
//            reloadAndCloneRecord: "reloadAndCloneRecord",
//            createNewFromExistingRecord: "createNewFromExistingRecord",
//            cancel: "cancel",
//            hasMediaAttached: "hasMediaAttached",
//            hasRelations: "hasRelations",
//            cloneAndStore: "cspace.recordEditor.cloneAndStore"
//        },
//        navigationEventNamespace: undefined,
//        produceTree: "cspace.recordEditor.produceTree",
//        events: {
//            afterFetch: null,
//            onSave: "preventable",
//            onCancel: null,
//            cancelSave: null,
//            afterRemove: null, // params: textStatus
//            onError: null, // params: operation
//            afterRenderRefresh: null
//        },
//        listeners: {
//            afterFetch: "{cspace.recordEditor}.afterFetchHandler"
//        },
//        showDeleteButton: false,
//        showCreateFromExistingButton: false,
//        saveCancelPermission: "update",
//        selectors: {
//            save: ".csc-save",
//            recordTraverser: ".csc-recordTraverser",
//            cancel: ".csc-cancel",
//            deleteButton: ".csc-delete",
//            createFromExistingButton: ".csc-createFromExisting",
//            requiredFields: ".csc-required:visible",
//            header: ".csc-recordEditor-header",
//            togglable: ".csc-recordEditor-togglable"
//        },
//        selectorsToIgnore: ["recordTraverser", "requiredFields", "identificationNumber", "header", "togglable"],
//        fieldsToIgnore: ["csid", "fields.csid"],
//        rendererFnOptions: {
//            cutpointGenerator: "cspace.recordEditor.cutpointGenerator"
//        },
//        rendererOptions: {
//            autoBind: true,
//            instantiator: "{instantiator}",
//            parentComponent: "{recordEditor}"
//        },
//        parentBundle: "{globalBundle}",
//        resolver: "{permissionsResolver}",
//        strings: {},
//        urls: cspace.componentUrlBuilder({
//            deleteURL: "%webapp/html/findedit.html",
//            cloneURL: "%webapp/html/%recordType.html"
//        })
//    });

    fluid.defaults("cspace.recordEditor", {
        gradeNames: ["autoInit", "fluid.rendererComponent"],
        mergePolicy: {
            fieldsToIgnore: "replace",
            "uispec": "nomerge"
        },
        fieldsToIgnore: ["fields.csid"],
        preInitFunction: "cspace.recordEditor.preInit",
        finalInitFunction: "cspace.recordEditor.finalInit",
        selectors: {
            controlPanel: ".csc-recordEditor-controlPanel-container",
            recordRendererContainer: ".csc-recordEditor-renderer-container",
            header: ".csc-recordEditor-header",
            togglable: ".csc-recordEditor-togglable"
        },
        protoTree: {
            controlPanel: {
                decorators: {
                    type: "fluid",
                    func: "cspace.recordEditor.controlPanel"
                }
            }
        },
        selectorsToIgnore: ["recordRendererContainer", "header", "togglable"],
        resources: {
            template: cspace.resourceSpecExpander({
                fetchClass: "fastTemplate",
                url: "%webapp/html/components/RecordEditorTemplate.html",
                options: {
                    dataType: "html"
                }
            })
        },
        components: {
            messanger: {
                type: "cspace.recordEditor.messanger"
            },
            confirmation: {
                type: "cspace.confirmation"
            },
            changeTracker: {
                type: "cspace.recordEditor.changeTracker",
                options: {
                    model: "{cspace.recordEditor}.model",
                    applier: "{cspace.recordEditor}.applier"
                },
                createOnEvent: "afterFetch"
            },
            remover: {
                type: "cspace.recordEditor.remover",
                createOnEvent: "afterFetch",
                options: {
                    recordType: "{cspace.recordEditor}.options.recordType",
                    strings: "{cspace.recordEditor}.options.strings"
                }
            },
            canceller: {
                type: "cspace.recordEditor.canceller",
                createOnEvent: "afterFetch"
            },
            localStorage: {
                type: "cspace.util.localStorageDataSource",
                options: {
                    elPath: "modelToClone"
                }
            },
            cloner: {
                type: "cspace.recordEditor.cloner",
                options: {
                    model: "{cspace.recordEditor}.model",
                    fieldsToIgnore: "{cspace.recordEditor}.options.fieldsToIgnore",
                    recordType: "{cspace.recordEditor}.options.recordType"
                }
            },
            recordRenderer: {
                type: "cspace.recordEditor.recordRenderer",
                container: "{cspace.recordEditor}.dom.recordRendererContainer",
                options: {
                    model: "{cspace.recordEditor}.model",
                    applier: "{cspace.recordEditor}.applier",
                    uispec: "{cspace.recordEditor}.options.uispec",
                    resources: "{cspace.recordEditor.templateFetcher}.options.resources"
                },
                createOnEvent: "ready"
            },
            templateFetcher: {
                type: "cspace.recordEditor.templateFetcher",
                priority: "first",
                options: {
                    recordType: "{cspace.recordEditor}.options.recordType",
                    events: {
                        afterFetch: "{cspace.recordEditor}.events.afterFetchTemplate"
                    }
                }
            },
            recordDataSource: {
                type: "cspace.recordEditor.dataSource",
                options: {
                    recordType: "{cspace.recordEditor}.options.recordType"
                }
            },
            recordEditorTogglable: {
                type: "cspace.util.togglable",
                options: {
                    selectors: {
                        header: "{cspace.recordEditor}.options.selectors.header",
                        togglable: "{cspace.recordEditor}.options.selectors.togglable"
                    }
                },
                createOnEvent: "ready"
            }
        },
        events: {
            afterFetch: null,
            afterFetchTemplate: null,
            ready: {
                events: {
                    data: "{cspace.recordEditor}.events.afterFetch",
                    template: "{cspace.recordEditor}.events.afterFetchTemplate"
                }
            },
            onSave: "preventable",
            afterSave: null,
            onRemove: "preventable",
            afterRemove: null,
            onCancel: null,
            onCreateFromExisting: null,

            onError: null,
            cancelSave: null
        },
        listeners: {
            ready: "{cspace.recordEditor}.onReady"
        },
        parentBundle: "{globalBundle}",
        showCreateFromExistingButton: false,
        showDeleteButton: false
    });

    fluid.fetchResources.primeCacheFromResources("cspace.recordEditor");

    cspace.recordEditor.preInit = function (that) {
        that.onReady = function () {
            that.refreshView();
        };
    };

    cspace.recordEditor.finalInit = function (that) {
        var modelToClone = that.localStorage.get();
        if (modelToClone) {
            that.localStorage.set();
            that.applier.requestChange("", modelToClone);
            that.events.afterFetch.fire();
        } else {
            that.recordDataSource.get(function (data) {
                if (data.isError) {
                    that.events.onError.fire(data, "fetch");
                    return;
                }
                that.applier.requestChange("", data);
                that.events.afterFetch.fire();
            });
        }
    };

    fluid.defaults("cspace.recordEditor.cloner", {
        gradeNames: ["fluid.modelComponent", "fluid.eventedComponent", "autoInit"],
        components: {
            localStorage: "{localStorage}",
            globalNavigator: "{globalNavigator}"
        },
        events: {
            onCreateFromExisting: {
                event: "{cspace.recordEditor}.events.onCreateFromExisting"
            }
        },
        listeners: {
            onCreateFromExisting: "{cspace.recordEditor.cloner}.clone"
        },
        preInitFunction: "cspace.recordEditor.cloner.preInit",
        cloneURL: cspace.componentUrlBuilder("%webapp/html/%recordType.html%vocab")
    });

    cspace.recordEditor.cloner.preInit = function (that) {
        that.clone = function () {
            that.globalNavigator.events.onPerformNavigation.fire(function () {
                var modelToClone = fluid.copy(that.model);
                fluid.each(that.options.fieldsToIgnore, function (fieldPath) {
                    fluid.set(modelToClone, fieldPath);
                });
                that.localStorage.set(modelToClone);
                window.location = fluid.stringTemplate(that.options.cloneURL, {recordType: that.options.recordType});
            });
        };
    };

    fluid.defaults("cspace.recordEditor.changeTracker", {
        gradeNames: ["autoInit", "fluid.modelComponent", "fluid.eventedComponent"],
        preInitFunction: "cspace.recordEditor.changeTracker.preInit",
        finalInitFunction: "cspace.recordEditor.changeTracker.finalInit",
        events: {
            onChange: null,
            afterSave: {
                event: "{cspace.recordEditor}.events.afterSave"
            },
            onSave: {
                event: "{cspace.recordEditor}.events.onSave"
            }
        },
        components: {
            globalNavigator: "{globalNavigator}",
            parentBundle: "{globalBundle}",
            confirmation: "{confirmation}"
        }
    });

    cspace.recordEditor.changeTracker.finalInit = function (that) {
        that.globalNavigator.events.onPerformNavigation.addListener(function (callback) {
            if (that.unsavedChanges) {
                that.confirmation.open("cspace.confirmation.saveDialog", undefined, {
                    listeners: {
                        onClose: function (userAction) {
                            if (userAction === "act") {
                                that.events.afterSave.addListener(function () {
                                    callback();
                                }, undefined, undefined, "last");
                                that.events.onSave.fire();
                            } else if (userAction === "proceed") {
                                callback();
                            }
                        }
                    },
                    parentBundle: that.parentBundle
                });
                return false;
            }
        });
    };

    cspace.recordEditor.changeTracker.preInit = function (that) {
        that.rollbackModel = fluid.copy(that.model);
        that.unsavedChanges = false;
        that.applier.modelChanged.addListener("", function () {
            that.unsavedChanges = true;
            that.events.onChange.fire(that.unsavedChanges);
        });
        that.revert = function () {
            that.applier.requestChange("", that.rollbackModel);
            that.unsavedChanges = false;
            that.events.onChange.fire(that.unsavedChanges);
        };
    };

    fluid.defaults("cspace.recordEditor.remover", {
        gradeNames: ["autoInit", "fluid.eventedComponent"],
        events: {
            onRemove: {
                event: "{cspace.recordEditor}.events.onRemove"
            },
            afterRemove: {
                event: "{cspace.recordEditor}.events.afterRemove"
            },
            afterFetchProcedures: null,
            afterFetchCataloging: null,
            afterFetch: {
                events: {
                    procedures: "{cspace.recordEditor.remover}.events.afterFetchProcedures",
                    cataloging: "{cspace.recordEditor.remover}.events.afterFetchCataloging"
                },
                args: ["{arguments}.procedures.0", "{arguments}.cataloging.0"]
            }
        },
        listeners: {
            afterFetch: "{cspace.recordEditor.remover}.onAfterFetch",
            onRemove: "{cspace.recordEditor.remover}.onRemoveHandler"
        },
        components: {
            proceduresDataSource: {
                type: "cspace.recordEditor.remover.proceduresDataSource"
            },
            catalogingDataSource: {
                type: "cspace.recordEditor.remover.catalogingDataSource"
            }
        },
        invokers: {
            remove: "cspace.recordEditor.remover.remove",
            hasMediaAttached: "cspace.recordEditor.remover.hasMediaAttached",
            openConfirmation: "cspace.recordEditor.remover.openConfirmation"
        },
        preInitFunction: "cspace.recordEditor.remover.preInit",
        urls: cspace.componentUrlBuilder({
            proceduresURL: "%tenant/%tname/%recordType/procedure/%csid",
            catalogingURL: "%tenant/%tname/%recordType/cataloging/%csid"
        }),
        csid: {
            expander: {
                type: "fluid.deferredInvokeCall",
                func: "cspace.util.getUrlParameter",
                args: "csid"
            }
        }
    });

    fluid.demands("cspace.recordEditor.remover.openConfirmation", "cspace.recordEditor.remover", {
        funcName: "cspace.recordEditor.remover.openConfirmation",
        args: ["{confirmation}", "{recordDataSource}", "{globalBundle}", "{cspace.recordEditor.remover}", "{arguments}.0", "{arguments}.1"]
    });

    cspace.recordEditor.remover.openConfirmation = function (confirmation, recordDataSource, parentBundle, that, procedures, cataloging) {
        var hasRelations = procedures.relations.pagination.length + cataloging.relations.pagination.length > 0;
        confirmation.open("cspace.confirmation.deleteDialog", undefined, {
            listeners: {
                onClose: function (userAction) {
                    if (userAction === "act") {
                        recordDataSource.remove(function (data) {
                            if (data.isError) {
                                that.events.onError.fire(data, "delete");
                                return;
                            }
                            that.events.afterRemove.fire();
                        });
                    }
                }
            },
            model: {
                messages: ["recordEditor-dialog-deletePrimaryMessage"]
            },
            termMap: [
                parentBundle.resolve(that.options.recordType),
                that.hasMediaAttached() ? that.options.strings.deleteMessageMediaAttached : "",
                hasRelations ? that.options.strings.deleteMessageWithRelated : ""
            ],
            parentBundle: parentBundle
        });
    };

    cspace.recordEditor.remover.preInit = function (that) {
        that.onAfterFetch = function (procedures, cataloging) {
            that.openConfirmation(procedures, cataloging);
        };
        that.onRemoveHandler = function () {
            that.remove();
        };
    };

    fluid.demands("cspace.recordEditor.remover.proceduresDataSource",  ["cspace.localData", "cspace.recordEditor.remover"], {
        funcName: "cspace.recordEditor.remover.testProceduresDataSource",
        args: {
            targetTypeName: "cspace.recordEditor.remover.testProceduresDataSource",
            termMap: {
                recordType: "%recordType",
                csid: "%csid"
            }
        }
    });
    fluid.demands("cspace.recordEditor.remover.proceduresDataSource", "cspace.recordEditor.remover", {
        funcName: "cspace.URLDataSource",
        args: {
            url: "{cspace.recordEditor.remover}.options.urls.proceduresURL",
            termMap: {
                recordType: "%recordType",
                csid: "%csid"
            },
            targetTypeName: "cspace.recordEditor.remover.proceduresDataSource"
        }
    });
    fluid.defaults("cspace.recordEditor.remover.testProceduresDataSource", {
        url: "%test/data/%recordType/procedure/%csid.json"
    });
    cspace.recordEditor.remover.testProceduresDataSource = cspace.URLDataSource;

    fluid.demands("cspace.recordEditor.remover.catalogingDataSource",  ["cspace.localData", "cspace.recordEditor.remover"], {
        funcName: "cspace.recordEditor.remover.testCatalogingDataSource",
        args: {
            targetTypeName: "cspace.recordEditor.remover.testCatalogingDataSource",
            termMap: {
                recordType: "%recordType",
                csid: "%csid"
            }
        }
    });
    fluid.demands("cspace.recordEditor.remover.catalogingDataSource", "cspace.recordEditor.remover", {
        funcName: "cspace.URLDataSource",
        args: {
            url: "{cspace.recordEditor.remover}.options.urls.catalogingURL",
            termMap: {
                recordType: "%recordType",
                csid: "%csid"
            },
            targetTypeName: "cspace.recordEditor.remover.catalogingDataSource"
        }
    });
    fluid.defaults("cspace.recordEditor.remover.testCatalogingDataSource", {
        url: "%test/data/%recordType/cataloging/%csid.json"
    });
    cspace.recordEditor.remover.testCatalogingDataSource = cspace.URLDataSource;

    fluid.demands("cspace.recordEditor.remover.hasMediaAttached", "cspace.recordEditor", {
        funcName: "cspace.recordEditor.remover.hasMediaAttached",
        args: "{cspace.recordEditor}.model"
    });

    cspace.recordEditor.remover.hasMediaAttached = function (model) {
        return (model.fields && model.fields.blobCsid);
    };

    fluid.demands("cspace.recordEditor.remover.remove", "cspace.recordEditor", {
        funcName: "cspace.recordEditor.remover.remove",
        args: "{cspace.recordEditor.remover}"
    });

    cspace.recordEditor.remover.remove = function (that) {
        that.proceduresDataSource.get({
            recordType: that.options.recordType,
            csid: that.options.csid
        }, function (data) {
            that.events.afterFetchProcedures.fire(data);
        });
        that.catalogingDataSource.get({
            recordType: that.options.recordType,
            csid: that.options.csid
        }, function (data) {
            that.events.afterFetchCataloging.fire(data);
        });
    };

    fluid.defaults("cspace.recordEditor.canceller", {
        gradeNames: ["autoInit", "fluid.eventedComponent", "fluid.modelComponent"],
        events: {
            onCancel: {
                event: "{cspace.recordEditor}.events.onCancel"
            },
            ready: {
                event: "{cspace.recordEditor}.events.ready"
            }
        },
        components: {
            changeTracker: "{changeTracker}"
        },
        listeners: {
            onCancel: "{cspace.recordEditor.canceller}.onCancelHandler"
        },
        preInitFunction: "cspace.recordEditor.canceller.preInit",
        invokers: {
            cancel: "cspace.recordEditor.canceller.cancel"
        }
    });

    fluid.demands("cspace.recordEditor.canceller.cancel", "cspace.recordEditor.canceller", {
        funcName: "cspace.recordEditor.canceller.cancel",
        args: "{cspace.recordEditor.canceller}"
    });

    cspace.recordEditor.canceller.cancel = function (that) {
        that.changeTracker.revert();
        that.events.ready.fire();
    };

    cspace.recordEditor.canceller.preInit = function (that) {
        that.onCancelHandler = function () {
            that.cancel();
        };
    };

    fluid.defaults("cspace.recordEditor.messanger", {
        gradeNames: ["autoInit", "fluid.eventedComponent"],
        events: {
            onError: {
                event: "{cspace.recordEditor}.events.onError"
            }
        },
        listeners: {
            onError: "{cspace.recordEditor.messanger}.onErrorHandler"
        },
        preInitFunction: "cspace.recordEditor.messanger.preInit",
        components: {
            messageBar: "{messageBar}",
            globalBundle: "{globalBundle}"
        },
        recordType: "{cspace.recordEditor}.options.recordType"
    });

    cspace.recordEditor.messanger.preInit = function (that) {
        that.onErrorHandler = function (data, operation) {
            if (!data) {
                return;
            }
            if (!data.messages) {
                var resolve = that.globalBundle.resolve;
                data.messages = fluid.makeArray(resolve("recordEditor-" + operation + "FailedMessage", [
                    resolve(that.options.recordType),
                    resolve("recordEditor-unknownError")
                ]));
            }
            var messages = data.messages || fluid.makeArray(data.message);
            fluid.each(messages, function (message) {
                that.messageBar.show(message, Date.today(), data.isError);
            });
        };
    };

    fluid.demands("cspace.util.eventBinder", ["cspace.recordEditor.controlPanel", "cspace.recordEditor.changeTracker"], {
        options: {
            listeners: {
                "{cspace.recordEditor.changeTracker}.events.onChange": "{cspace.recordEditor.controlPanel}.onChangeHandler"
            }
        }
    });

    fluid.demands("cspace.recordEditor.controlPanel", "cspace.recordEditor", {
        mergeAllOptions: [{
            recordModel: "{cspace.recordEditor}.model",
            recordApplier: "{cspace.recordEditor}.applier",
            model: {
                showCreateFromExistingButton: "{cspace.recordEditor}.options.showCreateFromExistingButton",
                showDeleteButton: "{cspace.recordEditor}.options.showDeleteButton"
            },
            recordType: "{cspace.recordEditor}.options.recordType"
        }, "{arguments}.1"]
    });

    fluid.defaults("cspace.recordEditor.controlPanel", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],
        preInitFunction: "cspace.recordEditor.controlPanel.preInit",
        finalInitFunction: "cspace.recordEditor.controlPanel.finalInit",
        mergePolicy: {
            recordModel: "preserve",
            recordApplier: "nomerge",
        },
        components: {
            changeTracker: "{changeTracker}",
            resolver: "{permissionsResolver}",
            eventBinder: {
                type: "cspace.util.eventBinder"
            }
        },
        resources: {
            template: cspace.resourceSpecExpander({
                fetchClass: "fastTemplate",
                url: "%webapp/html/components/ControlPanelTemplate.html",
                options: {
                    dataType: "html"
                }
            })
        },
        selectors: {
            createFromExistingButton: ".csc-createFromExisting",
            deleteButton: ".csc-delete",
            save: ".csc-save",
            cancel: ".csc-cancel"
        },
        events: {
            onSave: {
                event: "{cspace.recordEditor}.events.onSave"
            },
            onRemove: {
                event: "{cspace.recordEditor}.events.onRemove"
            },
            onCancel: {
                event: "{cspace.recordEditor}.events.onCancel"
            },
            onCreateFromExisting: {
                event: "{cspace.recordEditor}.events.onCreateFromExisting"
            }
        },
        produceTree: "cspace.recordEditor.controlPanel.produceTree",
        parentBundle: "{globalBundle}",
        strings: {},
        saveCancelPermission: "update"
    });

    cspace.recordEditor.controlPanel.produceTree = function (that) {
        return {
            expander: [{
                type: "fluid.renderer.condition",
                condition: "${showCreateFromExistingButton}",
                trueTree: {
                    createFromExistingButton: {
                        messagekey: "recordEditor-createFromExistingButton",
                        decorators: [{
                            type: "jQuery",
                            func: "prop",
                            args: {
                                disabled: "${disableCreateFromExistingButton}"
                            }
                        }, {
                            type: "jQuery",
                            func: "click",
                            args: that.events.onCreateFromExisting.fire
                        }]
                    }
                }
            }, {
                type: "fluid.renderer.condition",
                condition: "${showDeleteButton}",
                trueTree: {
                    deleteButton: {
                        messagekey: "recordEditor-deleteButton",
                        decorators: [{
                            type: "jQuery",
                            func: "prop",
                            args: {
                                disabled: "${disableDeleteButton}"
                            }
                        }, {
                            type: "jQuery",
                            func: "click",
                            args: that.events.onRemove.fire
                        }]
                    }
                }
            }, {
                type: "fluid.renderer.condition",
                condition: "${showSaveCancelButtons}",
                trueTree: {
                    save: {
                        messagekey: "recordEditor-save",
                        decorators: {
                            type: "jQuery",
                            func: "click",
                            args: that.events.onSave.fire
                        }
                    },
                    cancel: {
                        messagekey: "recordEditor-cancel",
                        decorators: [{
                            type: "jQuery",
                            func: "click",
                            args: that.events.onCancel.fire
                        }, {
                            type: "jQuery",
                            func: "prop",
                            args: {
                                disabled: "${disableCancelButton}"
                            }
                        }]
                    }
                }
            }]
        };
    };

    cspace.recordEditor.controlPanel.disableDeleteButton = function (rModel) {
        //disable if: model.csid is not set (new record)
        if (!rModel || !rModel.csid) {
            return true;
        }
        //disable if: if we are looking at admin account
        if (rModel.fields.email === "admin@collectionspace.org") {
            return true;
        }
//        //check whether we need to disable delete button due to related records
//        //that we do not have update permission to (which we need since we will
//        //be modifying their relations when deleting the record)
//        var relations = that.model.relations;
//        //if relations isn't set, no need to check any further
//        if (!relations || relations.length < 1 || $.isEmptyObject(relations)) {
//            return false;
//        }
//        var relatedTypes = [];
//        fluid.each(relations, function (val, recordType) {
//            relatedTypes.push({
//                target: recordType,
//                permission: "update"
//            });
//        });
//        //now build opts for checking permissions
//        return (!cspace.permissions.resolveMultiple({
//            recordTypeManager: that.options.recordTypeManager,
//            resolver: that.options.resolver,
//            allOf: relatedTypes
//        }));
        return false;
    };

    cspace.recordEditor.controlPanel.preInit = function (that) {
        that.onChangeHandler = function (unsavedChanges) {
            that.locate("cancel").prop("disabled", !unsavedChanges);
            that.locate("createFromExistingButton").prop("disabled", !unsavedChanges);
        };
    };

    cspace.recordEditor.controlPanel.finalInit = function (that) {
        var rModel = that.options.recordModel;
        that.applier.requestChange("disableCreateFromExistingButton", !!(rModel && !rModel.csid));
        that.applier.requestChange("disableDeleteButton", cspace.recordEditor.controlPanel.disableDeleteButton(rModel));
        that.applier.requestChange("showSaveCancelButtons", cspace.permissions.resolve({
            permission: that.options.saveCancelPermission,
            target: that.options.recordType,
            resolver: that.resolver
        }));
        that.applier.requestChange("disableCancelButton", !that.changeTracker.unsavedChanges);
        that.refreshView();
    };

    fluid.fetchResources.primeCacheFromResources("cspace.recordEditor.controlPanel");

    fluid.defaults("cspace.recordEditor.templateFetcher", {
        gradeNames: ["autoInit", "fluid.eventedComponent"],
        resources: {
            template: cspace.resourceSpecExpander({
                url: "%webapp/html/pages/%recordTypeTemplate%template.html",
                options: {
                    dataType: "html"
                }
            })
        },
        template: {
            expander: {
                type: "fluid.deferredInvokeCall",
                func: "cspace.util.getUrlParameter",
                args: "template"
            }
        },
        events: {
            afterFetch: null
        },
        finalInitFunction: "cspace.recordEditor.templateFetcher.finalInit"
    });

    cspace.recordEditor.templateFetcher.finalInit = function (that) {
        var template = that.options.resources.template,
            recordType = that.options.recordType;
        recordType = recordType.charAt(0).toUpperCase() + recordType.slice(1);
        template.url = fluid.stringTemplate(template.url, {
            recordType: recordType,
            template: that.options.template
        });
        fluid.fetchResources(that.options.resources, function () {
            that.events.afterFetch.fire(that.options.resources.template.resourceText);
        });
    };

    fluid.defaults("cspace.recordEditor.recordRenderer", {
        gradeNames: ["autoInit", "fluid.rendererComponent"],
        mergePolicy: {
            fieldsToIgnore: "replace",
            "rendererOptions.applier": "applier",
            "rendererOptions.instantiator": "nomerge",
            "rendererOptions.parentComponent": "nomerge",
            "rendererFnOptions.uispec": "uispec",
            "uispec": "nomerge"
        },
        produceTree: {
            expander: {
                type: "fluid.deferredInvokeCall",
                func: "cspace.recordEditor.recordRenderer.provideProduceTree",
                args: "{recordEditor}.options.recordType"
            }
        },
        rendererFnOptions: {
            cutpointGenerator: "cspace.recordEditor.recordRenderer.cutpointGenerator"
        },
        rendererOptions: {
            autoBind: true,
            instantiator: "{instantiator}",
            parentComponent: "{recordRenderer}"
        },
        renderOnInit: true,
        parentBundle: "{globalBundle}",
        strings: {},
        selectors: {}
    });

    cspace.recordEditor.recordRenderer.provideProduceTree = function (recordType) {
        return recordType === "media" ? "cspace.recordEditor.recordRenderer.produceTreeMedia" : "cspace.recordEditor.recordRenderer.produceTree";
    };

    cspace.recordEditor.recordRenderer.produceTree = function (that) {
        return fluid.copy(that.options.uispec);
    };

    cspace.recordEditor.recordRenderer.cutpointGenerator = function (selectors, options) {
        var cutpoints = options.cutpoints || fluid.renderer.selectorsToCutpoints(selectors, options) || [];
        return cutpoints.concat(cspace.renderUtils.cutpointsFromUISpec(options.uispec));
    };

    fluid.defaults("cspace.recordEditor.dataSource", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        mergePolicy: {
            schema: "nomerge"
        },
        components: {
            source: {
                type: "cspace.recordEditor.dataSource.source"
            }
        },
        urls: cspace.componentUrlBuilder({
            recordURL: "%tenant/%tname/basic/%recordType/%csid"
        }),
        csid: {
            expander: {
                type: "fluid.deferredInvokeCall",
                func: "cspace.util.getUrlParameter",
                args: "csid"
            }
        },
        schema: "{pageBuilder}.schema",
        finalInitFunction: "cspace.recordEditor.dataSource.finalInit"
    });

    cspace.recordEditor.dataSource.finalInit = function (that) {
        //TODO: Think about error callbacks.
        that.get = function (callback) {
            if (!that.options.csid) {
                callback(cspace.util.getBeanValue({}, that.options.recordType, that.options.schema));
                return;
            }
            that.source.get({
                csid: that.options.csid,
                recordType: that.options.recordType
            }, callback);
        };
        that.set = function (model, callback) {
            that.options.csid = that.options.csid || model.csid;
            that.source.set(model, {
                csid: that.options.csid,
                recordType: that.options.recordType
            }, function (data) {
                if (data.csid) {
                    that.options.csid = that.options.csid || data.csid;
                }
                callback(data);
            })
        };
        that.remove = function (callback) {
            if (!that.options.csid) {
                return callback();
            }
            that.source.remove({
                csid: that.options.csid,
                recordType: that.options.recordType
            }, callback);
        };
    };

    fluid.demands("cspace.recordEditor.dataSource.source",  ["cspace.localData", "cspace.recordEditor.dataSource"], {
        funcName: "cspace.recordEditor.dataSource.testDataSource",
        args: {
            writeable: true,
            removable: true,
            targetTypeName: "cspace.recordEditor.dataSource.testDataSource",
            termMap: {
                recordType: "%recordType",
                csid: "%csid"
            }
        }
    });
    fluid.demands("cspace.recordEditor.dataSource.source", ["cspace.recordEditor.dataSource"], {
        funcName: "cspace.URLDataSource",
        args: {
            writeable: true,
            removable: true,
            url: "{cspace.recordEditor.dataSource}.options.urls.recordURL",
            termMap: {
                recordType: "%recordType",
                csid: "%csid"
            },
            targetTypeName: "cspace.recordEditor.dataSource.source"
        }
    });

    fluid.defaults("cspace.recordEditor.dataSource.testDataSource", {
        url: "%test/data/basic/%recordType/%csid.json"
    });
    cspace.recordEditor.dataSource.testDataSource = cspace.URLDataSource;

//    cspace.recordEditor.removeWithCheck = function (that) {
//        // If our record is used by any other record then we do not want to allow to
//        // delete it. Just notify a user about it.
//        var removeMessage;
//        if (fluid.makeArray(that.model.refobjs.length) > 0) {
//            removeMessage = "deleteDialog-usedByMessage";
//        } else if (fluid.find(that.model.fields.narrowerContexts, function (element) {
//            return element.narrowerContext || undefined;
//        })) {
//            removeMessage = "deleteDialog-hasNarrowerContextsMessage";
//        } else if (that.model.fields.broaderContext) {
//            removeMessage = "deleteDialog-hasBroaderContextMessage";
//        }
//        
//        if (removeMessage) {
//            that.confirmation.open("cspace.confirmation.deleteDialog", undefined, {
//                enableButtons: ["act"],
//                model: {
//                    messages: [removeMessage],
//                    messagekeys: {
//                        actText: "alertDialog-actText"
//                    }
//                },
//                termMap: [
//                    that.lookupMessage(that.options.recordType)
//                ],
//                parentBundle: that.options.parentBundle
//            });
//        } else {
//            cspace.recordEditor.remove(that);
//        }
//    };
//    
//    cspace.recordEditor.remove = function (that) {
//        that.confirmation.open("cspace.confirmation.deleteDialog", undefined, {
//            listeners: {
//                onClose: function (userAction) {
//                    if (userAction === "act") {
//                        that.options.dataContext.remove(that.model.csid);
//                        processChanges(that, false);
//                    }
//                }
//            },
//            model: {
//                messages: ["recordEditor-dialog-deletePrimaryMessage"]
//            },
//            termMap: [
//                that.lookupMessage(that.options.recordType),
//                that.hasMediaAttached(that) ? that.options.strings.deleteMessageMediaAttached : "",
//                that.hasRelations(that) ? that.options.strings.deleteMessageWithRelated : ""
//            ],
//            parentBundle: that.options.parentBundle
//        });
//    };
//    
//    cspace.recordEditor.rollback = function (that) {
//        that.options.applier.requestChange("fields", that.rollbackModel);
//        that.refreshView();
//    };
//
//    /*
//     * Opens an alert box informing user printing the string defined in
//     * options.strings.removeSuccessfulMessage. After user dismisses dialog,
//     * user is redirected to the URL defined in: options.urls.deleteURL
//     * Note that deletion should already have taken place before this function is
//     * called. This function merely shows dialog to user and redirects.
//     */
//    cspace.recordEditor.redirectAfterDelete = function (that) {
//        that.confirmation.open("cspace.confirmation.alertDialog", undefined, {
//            listeners: {
//                onClose: function (userAction) {
//                    window.location = that.options.urls.deleteURL;
//                }
//            },
//            parentBundle: that.options.parentBundle,
//            model: {
//                 messages: [ "recordEditor-dialog-removeSuccessfulMessage" ]
//            },
//            termMap: [
//                that.lookupMessage(that.options.recordType)
//            ]
//        });
//    };
//
//    /*
//     * Dismisses the record that the user was in (now deleted) and displays
//     * a message in the messagebar, informing the user that the record was
//     * deleted.
//     */
//    cspace.recordEditor.statusAfterDelete = function (that) {
//        //show messagebar
//        that.messageBar.show(fluid.stringTemplate(that.options.strings.removeSuccessfulMessage, {
//            record: that.lookupMessage(that.options.recordType)
//        }), null, false);
//    };
//    
//    // NOTE: THIS IS A HACK BECAUSE THE SERVER DOES NOT RETURN ANY PAYLOAD RELATED TO THE MEDIA ATTACHED (CSPACE-3757).
//    cspace.recordEditor.produceTreeMedia = function (that) {
//        var tree = cspace.recordEditor.produceTree(that);
//        fluid.merge(null, tree.expander[1].trueTree, {
//            mediaImage: {
//                decorators: [{
//                    type: "attrs",
//                    attributes: {
//                        src: "${fields.blobs.0.imgThumb}"
//                    }
//                }, {
//                    type: "addClass",
//                    classes: that.options.styles.mediaImage
//                }, {
//                    type: "jQuery",
//                    func: "click",
//                    args: that.navigateToFullImage
//                }]
//            }
//        });
//        return tree;
//    };
//    
//    cspace.recordEditor.navigateToFullImage = function (that) {
//        window.open(that.model.fields.blobs[0].imgOrig, "_blank", fluid.stringTemplate(that.lookupMessage("media-originalMediaOptions"), {
//            height: that.options.originalMediaDimensions.height,
//            width: that.options.originalMediaDimensions.width,
//            scrollbars: "yes"
//        }));
//    };
//    
//    cspace.recordEditor.produceTreeTemplate = function (that) {
//        var tree = cspace.recordEditor.produceTree(that);
//        tree.templateEditor = {
//            decorators: {
//                type: "fluid",
//                func: "cspace.templateEditor"
//            }
//        };
//        return tree;
//    };
//    
//    cspace.recordEditor.cloneAndStore = function (that) {
//        var modelToClone = fluid.copy(that.model);
//        fluid.each(that.options.fieldsToIgnore, function (fieldPath) {
//            fluid.set(modelToClone, fieldPath);
//        });
//        that.localStorage.set(modelToClone);
//    };
//    
//    cspace.recordEditor.reloadAndCloneRecord = function (that) {
//        that.cloneAndStore();
//        window.location = fluid.stringTemplate(that.options.urls.cloneURL, {
//            recordType: that.options.recordType,
//            vocab: that.model.namespace ? ("?" + $.param({
//                vocab: that.model.namespace
//            })) : ""
//        });
//    };
//    
//    cspace.recordEditor.createNewFromExistingRecord = function (globalNavigator, callback) {
//        globalNavigator.events.onPerformNavigation.fire(callback);
//    };
//
//    cspace.recordEditor.hasMediaAttached = function (that) {
//        return (that.model.fields && that.model.fields.blobCsid);
//    };
//
//    cspace.recordEditor.hasRelations = function (that) {
//        return (that.model.csid && that.model.relations && !$.isEmptyObject(that.model.relations));
//    };
//
//    cspace.recordEditor.finalInit = function (that) {
//        that.refreshView = function () {
//            that.options.readOnly = cspace.util.isReadOnly(that.options.readOnly, that.model);
//            fluid.log("RecordEditor.js before render");
//            that.renderer.refreshView();
//            cspace.util.processReadOnly(that.container, that.options.readOnly);
//            processChanges(that, false);
//            that.rollbackModel = fluid.copy(that.model.fields);
//            that.messageBar.hide();
//            bindHandlers(that);
//            fluid.log("RecordEditor.js renderPage end");
//        };
//        that.refreshNoSave = function () {
//            fluid.log("RecordEditor.js before render");
//            that.renderer.refreshView();
//            that.messageBar.hide();
//            bindHandlers(that);
//            fluid.log("RecordEditor.js renderPage end");
//        };
//    };
//
//    cspace.recordEditor.requestSaveMovement = function (that) {
//        that.confirmation.open("cspace.confirmation.saveDialog", undefined, {
//            model: {
//                messages: ["lockDialog-primaryMessage", "lockDialog-secondaryMessage"],
//                messagekeys: {
//                    actText: "lockDialog-actText",
//                    actAlt: "lockDialog-actAlt",
//                    proceedText: "lockDialog-proceedText",
//                    proceedAlt: "lockDialog-proceedAlt"
//                }
//            },
//            listeners: {
//                onClose: function (userAction) {
//                    if (userAction === "act") {
//                        cspace.recordEditor.requestSave(that);
//                    } else if (userAction === "proceed") {
//                        that.applier.requestChange("workflowTransition", "lock");
//                        cspace.recordEditor.requestSave(that);
//                    }
//                }
//            },
//            parentBundle: that.options.parentBundle
//        });
//    };
//
//    /*
//     * return: Boolean true if the save was submitted, false if it was prevented by any event listeners.
//     * Note that a return value of true does not necessarily indicate that the save was successful, only that
//     * it was successfully submitted.
//     */
//    cspace.recordEditor.requestSave = function (that) {
//        var ret = that.events.onSave.fire(that.model),
//            vocab = cspace.vocab.resolve({
//                model: that.model,
//                recordType: that.options.recordType,
//                vocab: that.vocab
//            });
//        if (ret === false) {
//            that.events.cancelSave.fire();
//            return ret;
//       }
//        if (vocab) {
//            that.applier.requestChange("namespace", vocab);
//        }
//        if (that.validator) {
//            var validatedModel = that.validator.validate(that.model);
//            if (!validatedModel) {
//                that.events.cancelSave.fire();
//                return false;
//            }
//            else {
//                that.applier.requestChange("", validatedModel)
//            }
//        }
//        that.locate("save").prop("disabled", true);
//        if (that.model.csid) {
//            that.options.dataContext.update();
//        } else {
//            that.options.applier.requestChange("csid", "");
//            that.options.dataContext.create();
//        }
//        return true;
//    };
//
//    cspace.recordEditor.preInit = function (that) {
//        that.afterFetchHandler = function () {
//            that.rollbackModel = fluid.copy(that.model.fields);
//            setupRecordEditor(that);
//        };
//    };
    
}