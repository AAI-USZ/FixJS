function(){
                return [
                {
                    i18nButtonLabelPointer: 'npEditPageAction',
                    iconClass:'dijitIconEdit',
                    init: function(initCallback, adminDialog){
                        this.ad = adminDialog;
                        var self = this;
                        require(['azfcms/view/navigation/ContentEdit','azfcms/controller/navigation/ContentEdit','azfcms/model'],function
                            (cep,cec,model){
                                self.model = model;
                                self.CEP = cep;
                                self.CEC = cec;
                                initCallback();
                            })
                        
                    },
                    callback: function(item){
                        var cep = new this.CEP({
                            typeStore:this.model.prepareLangStore('cms.pluginDescriptor.getContentPlugins()')
                        });
                        var cec = new this.CEC();
                        cec.init(item,cep);
                        this.ad.addChild(cep);
                    }
                },
                {
                    i18nButtonLabelPointer: 'npCreatePageAction',
                    iconClass:'dijitIconDocuments',
                    init: function(initCallback,adminDialog){
                        var context = this;
                        require(
                            ['azfcms/view/navigation/CreatePageDialog','azfcms/controller/navigation/CreatePage',
                            'azfcms/model'],function
                            (CPD,CPC,
                                model){
                                context.cpd = new CPD({
                                    store:model.prepareLangStore('cms.pluginDescriptor.getContentPlugins()')
                                });
                                context.cpc = new CPC(context.cpd);
                            
                                initCallback();
                            })
                    },
                    callback: function(item){
                        if(item){
                            this.cpc.show(item);
                        }
                        
                    }
                },
                {
                    i18nButtonLabelPointer: 'npDeletePageAction',
                    iconClass:'dijitIconDelete',
                    init: function(initCallback,adminDialog){
                        var self = this;
                        require(
                            ['azfcms/view/navigation/DeletePageDialog','azfcms/controller/navigation/DeletePage',
                            'azfcms/model'],function
                            (DPD,DPC,
                                model){
                                var view = new DPD();
                                self.controller = new DPC({
                                    view:view
                                });
                            
                                initCallback();
                            })
                    },
                    callback: function(item){
                        if(item){
                            this.controller.activate(item);
                        }
                        
                    }
                },
                {
                    i18nButtonLabelPointer: 'npPagePluginsAction',
                    iconClass:'dijitIconDocument',
                    init: function(initCallback,adminDialog, item){
                        var self = this;
                        require(
                            ['azfcms/view/ExtensionEditorPane','azfcms/controller/ExtensionEditorController',
                            'azfcms/model','azfcms/model/cms','dojo/query'],function
                            (EEP,EEC,
                                model,cms,query){
                                var requireLink = "<link rel='stylesheet' type='text/css' href='"+require.toUrl('')+'/dojox/grid/resources/claroGrid.css'+"' />";
                                requireLink += "<link rel='stylesheet' type='text/css' href='"+require.toUrl('')+'/dojox/grid/resources/Grid.css'+"' />";
                                query("head").addContent(requireLink);
                                self.EEP = EEP;
                                self.EEC = EEC;
                                self.cms = cms;
                                self.adminDialog = adminDialog;
                                self.typeStore = cms.getExtensionPluginStore();
                                self.typeStore.query({}).then(function(){
                                    initCallback();
                                    
                                })
                                
                            })
                    },
                    callback: function(item){
                        if(item){
                            var cms = this.cms;
                            var view = new this.EEP({
                                    regionStore:cms.getTemplateRegionsForNavigationStore(item.id),
                                    gridStore:cms.getRegionPluginsStore(item.id, ""),
                                    typeStore:this.typeStore,
                                    closable:true
                                });
                                this.adminDialog.addChild(view);
                                new this.EEC({
                                    editorPane:view,
                                    navigationId:item.id,
                                    model:cms
                                });
                        }
                        
                    }
                },
                {
                    i18nButtonLabelPointer: 'npFilesystemAction',
                    iconClass:'dijitIconDocument',
                    init: function(initCallback,adminDialog, item){
                        var self = this;
                        require(
                            ['azfcms/view/FilesystemPane','azfcms/controller/FilesystemPaneController',
                            'azfcms/store/Filesystem'],function
                            (FP,FPC,FSStore){
                                self.adminDialog = adminDialog;
                                self.FP = FP
                                self.FPC = FPC;
                                self.gridStore = new FSStore({
                                    
                                })
                                self.treeStore = new FSStore({
                                    getOptions:{file:false}
                                })
                                initCallback()
                            })
                    },
                    callback: function(item){
                        var fp = new this.FP({
                            closable:true,
                            title:nls.npFilesystemAction,
                            gridStore:this.gridStore,
                            treeStore:this.treeStore
                        });
                        var fpc = new this.FPC({
                            view:fp
                        })
                        
                        this.adminDialog.addChild(fp);
                        fp.resize();
                        
                    }
                }
                ];
            }