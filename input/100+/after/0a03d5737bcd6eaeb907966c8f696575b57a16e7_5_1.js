function () {
    
        fluid.demands("cspace.search.searchView.buildUrl", ["cspace.search.searchView", "cspace.localData"], {
            funcName: "cspace.search.searchView.buildUrlLocal",
            args: ["{searchView}.model.searchModel", "{searchView}.options.urls"]
        });
        
        fluid.demands("cspace.advancedSearch.fetcher", ["cspace.localData", "cspace.advancedSearch"], {
            options: {
                resourceSpec: {
                    uispec: {
                        href: {
                            expander: {
                                type: "fluid.deferredInvokeCall",
                                func: "cspace.util.urlBuilder",
                                args: "%tenant/%tname/uispecs/%recordType-search.json"
                            }
                        }
                    },
                    uischema: {
                        href: {
                            expander: {
                                type: "fluid.deferredInvokeCall",
                                func: "cspace.util.urlBuilder",
                                args: "%tenant/%tname/uischema/%recordType-search.json"
                            }
                        }
                    }
                }
            }
        });
        
        fluid.demands("cspace.util.extractTenant.segment", "cspace.localData", {
            options: {
                path: "defaults"
            }
        });
        
        // Report producer
        fluid.demands("cspace.reportProducer", ["cspace.sidebar", "cspace.localData"], {
            container: "{sidebar}.dom.report",
            options: {
                recordType: "{sidebar}.options.primaryRecordType"
            }
        });
        
        // getDefaultConfigURL demands
        fluid.demands("getRecordType", ["cspace.util.getDefaultConfigURL", "cspace.localData"], {
            funcName: "cspace.util.getDefaultConfigURL.getRecordTypeLocal"
        });
        
        // Admin demands
        fluid.demands("admin", ["cspace.pageBuilder", "cspace.pageBuilderIO", "cspace.localData"], {
            container: "{pageBuilder}.options.selectors.admin",
            options: {
                queryURL: "../../../../test/data/users/search.json",
                recordType: "{pageBuilderIO}.options.recordType"
            }
        });
        
        // Record List demands
        fluid.demands("select", ["cspace.recordList", "cspace.localData"], {
            funcName: "cspace.recordList.selectNavigate",
            args: ["{recordList}.model", "{recordList}.options", "{recordList}.options.urls.navigateLocal", "{permissionsResolver}", "{recordList}.dom"]
        });
        fluid.demands("select", ["cspace.recordList", "cspace.localData", "person", "cspace.relatedRecordsList"], {
            funcName: "cspace.recordList.selectNavigateVocab",
            args: ["{recordList}.model", "{recordList}.options", "{recordList}.options.urls.navigateLocal", "{permissionsResolver}", "{recordList}.dom"]
        });
        fluid.demands("select", ["cspace.recordList", "cspace.localData", "organization", "cspace.relatedRecordsList"], {
            funcName: "cspace.recordList.selectNavigateVocab",
            args: ["{recordList}.model", "{recordList}.options", "{recordList}.options.urls.navigateLocal", "{permissionsResolver}", "{recordList}.dom"]
        });
        fluid.demands("select", ["cspace.recordList", "cspace.localData", "location", "cspace.relatedRecordsList"], {
            funcName: "cspace.recordList.selectNavigateVocab",
            args: ["{recordList}.model", "{recordList}.options", "{recordList}.options.urls.navigateLocal", "{permissionsResolver}", "{recordList}.dom"]
        });
        fluid.demands("select", ["cspace.recordList", "cspace.localData", "place", "cspace.relatedRecordsList"], {
            funcName: "cspace.recordList.selectNavigateVocab",
            args: ["{recordList}.model", "{recordList}.options", "{recordList}.options.urls.navigateLocal", "{permissionsResolver}", "{recordList}.dom"]
        }); 
        fluid.demands("select", ["cspace.recordList", "cspace.localData", "concept", "cspace.relatedRecordsList"], {
            funcName: "cspace.recordList.selectNavigateVocab",
            args: ["{recordList}.model", "{recordList}.options", "{recordList}.options.urls.navigateLocal", "{permissionsResolver}", "{recordList}.dom"]
        });
        fluid.demands("select", ["cspace.recordList", "cspace.localData", "taxon", "cspace.relatedRecordsList"], {
            funcName: "cspace.recordList.selectNavigateVocab",
            args: ["{recordList}.model", "{recordList}.options", "{recordList}.options.urls.navigateLocal", "{permissionsResolver}", "{recordList}.dom"]
        });
        
        // Report Producer
        fluid.demands("cspace.reportProducer.reportTypesSource", ["cspace.reportProducer", "cspace.localData"], {
            funcName: "cspace.reportProducer.testReportTypesSource",
            args: {
                targetTypeName: "cspace.reportProducer.testReportTypesSource",
                termMap: {
                    recordType: "%recordType"
                }
            }
        });
        
        // List editor's demands
        fluid.demands("cspace.listEditor.listDataSource",  ["cspace.users", "cspace.localData", "cspace.listEditor"], {
            funcName: "cspace.listEditor.testListDataSource",
            args: {
                targetTypeName: "cspace.listEditor.testListDataSource",
                termMap: {
                    query: "%query",
                    recordType: "%recordType"
                }
            }
        });
        fluid.demands("cspace.listEditor.listDataSource",  ["cspace.localData", "cspace.listEditor"], {
            funcName: "cspace.listEditor.testListDataSource",
            args: {
                targetTypeName: "cspace.listEditor.testListDataSource",
                termMap: {
                    recordType: "%recordType"
                }
            }
        });
        fluid.demands("cspace.listEditor.listDataSource",  ["cspace.tab", "cspace.localData", "cspace.listEditor"], {
            funcName: "cspace.listEditor.testTabsListDataSource",
            args: {
                targetTypeName: "cspace.listEditor.testTabsListDataSource"
            }
        });
        
        // Autocomplete demands
        fluid.demands("cspace.autocomplete.authoritiesDataSource",  ["cspace.localData", "cspace.autocomplete"], {
            funcName: "cspace.autocomplete.testAuthoritiesDataSource",
            args: {
                targetTypeName: "cspace.autocomplete.testAuthoritiesDataSource"
            }
        });
        fluid.demands("cspace.autocomplete.matchesDataSource", ["cspace.localData", "cspace.autocomplete"], {
            funcName: "cspace.autocomplete.testMatchesDataSource",
            args: {
                targetTypeName: "cspace.autocomplete.testMatchesDataSource"
            }
        });
        fluid.demands("cspace.autocomplete.newTermDataSource",  ["cspace.localData", "cspace.autocomplete"], {
            funcName: "cspace.autocomplete.testNewTermDataSource",
            args: {
                targetTypeName: "cspace.autocomplete.testNewTermDataSource"
            }
        });
        
        // CreateNew demands
        fluid.demands("createRecord", ["cspace.pageBuilder", "cspace.localData"], {
            funcName: "cspace.createNew.createRecord",
            args: ["{createNew}.model", "{createNew}.options.urls.newRecordLocalUrl"]
        });
        
        // DataContext demands
        fluid.demands("detailsDC", ["cspace.listEditor", "cspace.localData"], {
            options: {
                model: "{listEditor}.options.detailsModel",
                baseUrl: "../../../../test/data",
                fileExtension: ".json",
                listeners: {
                    afterFetch: "{loadingIndicator}.events.hideOn.fire",
                    onError: "{loadingIndicator}.events.hideOn.fire",
                    onFetch: "{loadingIndicator}.events.showOn.fire",
                    modelChanged: {
                        listener: "{listEditor}.events.detailsModelChanged.fire",
                        priority: "last"
                    }
                },
                recordType: "{listEditor}.options.recordType"
            }
        });
        fluid.demands("detailsDC", ["cspace.listEditor", "cspace.tab", "cspace.localData"], {
            options: {
                model: "{listEditor}.options.detailsModel",
                baseUrl: "../../../../test/data",
                fileExtension: ".json",
                listeners: {
                    modelChanged: {
                        listener: "{listEditor}.events.detailsModelChanged.fire",
                        priority: "last"
                    },
                    afterFetch: "{loadingIndicator}.events.hideOn.fire",
                    onError: "{loadingIndicator}.events.hideOn.fire",
                    onFetch: "{loadingIndicator}.events.showOn.fire"
                }
            }
        });
        fluid.demands("dataContext", ["cspace.relationManager", "cspace.localData"], {
            options: {
                model: "{relationManager}.model",
                baseUrl: "../../../../test/data",
                fileExtension: ".json"
            }
        });
        fluid.demands("dataContext", ["cspace.pageBuilderIO", "cspace.localData"], {
            options: {
                listeners: {
                    afterFetch: "{loadingIndicator}.events.hideOn.fire",
                    onError: "{loadingIndicator}.events.hideOn.fire",
                    onFetch: "{loadingIndicator}.events.showOn.fire"
                },
                model: "{pageBuilderIO}.options.model",
                baseUrl: "../../../../test/data",
                fileExtension: ".json"
            }
        });
        
        // DataSource demands
        fluid.demands("dataSource", ["cspace.tab", "cspace.localData"], {
            options: {
                schema: "{pageBuilder}.schema"
            }
        });
        fluid.demands("dataSource", ["cspace.role", "cspace.localData"], {
            options: {
                schema: "{pageBuilder}.schema",
                sources: {
                    permission: {
                        href: "../../../../test/data/permission/list.json",
                        path: "fields.permissions",
                        resourcePath: "items",
                        merge: "cspace.dataSource.mergePermissions"
                    } 
                }
            }
        });
        fluid.demands("dataSource", ["cspace.users", "cspace.localData"], {
            options: {
                schema: "{pageBuilder}.schema",
                sources: {
                    role: {
                        href: "../../../../test/data/role/list.json",
                        path: "fields.role",
                        resourcePath: "items",
                        merge: "cspace.dataSource.mergeRoles"
                    } 
                }
            }
        });
        
        // Search To Relate Dialog
        fluid.demands("cspace.searchToRelateDialog", ["cspace.relationManager", "cspace.localData"], {
            container: "{relationManager}.dom.searchDialog",
            options: {
                strings: {
                    closeAlt: "{globalBundle}.messageBase.searchToRelateDialog-closeAlt"
                },
                showCreate: true,
                listeners: {
                    addRelations: "{relationManager}.addRelations"
                }
            }
        });

        fluid.demands("cspace.searchToRelateDialog", ["cspace.relationManager", "cspace.localData", "cspace.sidebar"], {
            container: "{relationManager}.dom.searchDialog",
            options: {                
                strings: {
                    closeAlt: "{globalBundle}.messageBase.searchToRelateDialog-closeAlt"
                },
                listeners: {
                    addRelations: "{relationManager}.addRelations"
                }
            }
        });
        
        fluid.demands("cspace.createTemplateBox", ["cspace.localData", "cspace.pageBuilder"], {
            container: "{pageBuilder}.options.selectors.createTemplateBox",
            options: {
                urls: {
                    expander: {
                        type: "fluid.deferredInvokeCall",
                        func: "cspace.util.urlBuilder",
                        args: {
                            cloneURL: "%webapp/html/record.html?recordtype=%recordType"
                        }
                    }                                    
                }
            }
        });
        
        fluid.demands("cspace.termList.termListSource",  ["cspace.localData", "cspace.termList"], {
            funcName: "cspace.termList.testTermListSource",
            args: {
                targetTypeName: "cspace.termList.testTermListSource"
            }
        });
        
        fluid.demands("cspace.createTemplateBox.listDataSource",  ["cspace.localData", "cspace.createTemplateBox"], {
            funcName: "cspace.createTemplateBox.testListDataSource",
            args: {
                targetTypeName: "cspace.createTemplateBox.testListDataSource",
                termMap: {
                    recordType: "%recordType"
                }
            }
        });
        
        fluid.demands("cspace.createTemplateBox.templateDataSource",  ["cspace.localData", "cspace.createTemplateBox"], {
            funcName: "cspace.createTemplateBox.testTemplateDataSource",
            args: {
                targetTypeName: "cspace.createTemplateBox.testTemplateDataSource",
                termMap: {
                    recordType: "%recordType",
                    templateType: "%templateType"
                }
            }
        });        
        
        // urlExpander demands
        fluid.demands("cspace.urlExpander", "cspace.localData", {
            options: {
                vars: {
                    tenant: "../../../../test",
                    tname: "."
                }
            }
        });
        
        // getLoginURL demands
        fluid.demands("cspace.util.getLoginURL", "cspace.localData", {
            options: {
                url: "%test/data/login/status.json"
            }
        });
        
        // getDefaultSchemaURL demands
        fluid.demands("cspace.util.getDefaultSchemaURL", "cspace.localData", {
            args: ["{arguments}.0", {
                url: "%test/uischema/%recordType.json"
            }]
        });
        
        // getUISpecURL demands
        fluid.demands("cspace.util.getUISpecURL", "cspace.localData", {
            args: ["{arguments}.0", {
                url: "%test/uispecs/%pageType.json"
            }]
        });
    }