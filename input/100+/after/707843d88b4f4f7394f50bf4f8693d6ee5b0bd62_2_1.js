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