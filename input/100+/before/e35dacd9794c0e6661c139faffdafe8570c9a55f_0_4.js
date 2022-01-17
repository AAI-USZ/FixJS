function(openedPanel) {
	   Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
	   Ext.QuickTips.init();  // enable tooltips
	   
		var headerPanel = new Ext.Panel({
			id: "qwbuilder_headerPanel",
			region: "north",
			layout: "border",
			height: 35,
			xtype: "panel",
			cls: window.Builder.productionEnvironment ? "production" : "development",
			border: false,
			items: [{
				xtype: "panel",
				border: false,
				html: $("header").innerHTML,
				region: "center"
			},{
				xtype: "panel",
				width: 515,
				border: false,
				layout: "table",
				cls: "header-nav",
				layoutConfig: {columns: 4, tableAttrs: {style: {width: '100%'}}},
				region: "east",
				items: [{
					xtype: "button",
					id: "show-user-mgmt",
					style: "margin-right: 10px;",
					iconCls: "user",
					text: "Account Mgmt",
					menu: {
						items: window.userMgmtItems
					}
				}, {
					xtype: "button",
					id: "testresult",
					style: "margin-right: 10px;",
					iconCls: "testUnknown",
					text: "Testsuite",
					menu: {
						defaults : {
			                checked: false,
			                group: 'testsuiteCheckGroup',
			                listeners: {
								click: window.__runTest = function(item) {
									if (item.id == "view-log")
										return;
																		
									Ext.getCmp("testresult").setText(item.text);
									
									if (!$("background_window")) {
										window.__testTargetWindowContainer = new Ext.Window({
											layout: "fit",
											title: "Test Run",
											modal: false,
											autoScroll: true,
											resizable: true,					
											shadow: true,
											width: 800,
											height: 600,
											plain: true,
											listeners: {
												close: function(p) {
													Ext.getCmp("view-run").setChecked(false);
												}
											},
											html: "<iframe name='background_testing_window' id='background_window' class='testRunWindow'></iframe>"					
										});
										window.__testTargetWindowContainer.show();
										window.__testTargetWindowContainer.hide();
//										document.body.appendChild(new Element("iframe", {name: "background_testing_window", id: "background_window", 'class': "testRunWindow"}))
									}
									window.__testTargetWindow = window.frames["background_testing_window"];
									// run selected test cases
									new Ajax.Request("?event=builder:listTestcase&json=1&fetch="+item.id+(item.type == "testcase" ? '&type=single' : ''), {
										method: "GET",
										onSuccess: function(req) {
											resetTest();
											var testsuite = eval(req.responseText);
											testsuite.start();
										}
									});
								}
							}
			            },
						items: window.testsuites
					}
				}, {
					xtype: "button",
					style: "margin-right: 10px;",
					iconCls: "package",
					text: "Package",
					handler: function(){
						window.packageWindow = new Ext.Window({
							layout: "fit",
							title: "Package",
							iconCls: "package",
							modal: true,
							shadow: true,
							width: 441,
							height: 404,
							plain: true,
							items: [
							        new Ext.TabPanel({
							        	activeTab: 0,
							        	border: false,
							        	items: [{
							        		title: "Export",
							        		html: $("export_panel").innerHTML
							        	},{
							        		title: "Import",
							        		id: "import",
							        		html: $("import_panel").innerHTML.replace(/<!--|-->/gmi, "")
							        	}, {
							        		title: "Replication",
							        		tabTip: (!$("replicate_panel") ? "Replication can only be run on a production instance." : ""),
							        		disabled: !$("replicate_panel"),
							        		id: "replication",
							        		html: ($("replicate_panel") && $("replicate_panel").innerHTML.replace(/<!--|-->/gmi, "")) || "" 
							        	}, {
							        		title: "Schedule Backups",
							        		id: "backupschedule",
							        		html: $("backup_panel").innerHTML.replace(/<!--|-->/gmi, "")
							        	}],
							        	listeners: {
							        		tabchange: function(panel, tab) {
							        			if (tab.getId() == "import") {
							        				QuixoticWorxUpload.init();							        				
							        			} else if (tab.id == "backupschedule") {
							        				var data = window.schedule; 
							        				if (data) for (var all in data) {
							        					if (all != "week") {
							        						if (data[all][0] == "*") {
							        							if (data[all].indexOf('/') > 0) {
							        								$$(".scheduler .repeat input")[0].value = data[all].split("/")[1];
								        							$$(".scheduler .repeat select option").each(function(item) {
								        								if (item.value == all+"s") {
								        									item.selected = true;
								        									throw $break;
								        								}
								        							});
							        							}
							        						}
							        					} else {
							        						$$(".scheduler .days input").each(function(input) {
							        							if ((data[all]+",").indexOf(input.value) >= 0) {
							        								input.checked = true;
							        							} else {
							        								input.checked = false;
							        							}
							        						});
							        					}
							        				}							        				
							        			}
							        		}
							        	}
							        })
							]
						});
						window.packageWindow.show(this);
						QuixoticWorxUpload.init();
					}
				}, {
					xtype: "combo",
					width: 200,
					id: "item.quickOpen",
					emptyText: "Open item...",
					selectOnFocus: true,
					displayField: "name",
					valueField: "id",
					typeAhead: true,
					mode: "remote",
					listeners: {
						specialkey: function(field, event) {
							if (event.getKey() == event.ENTER) {
								var val = field.getValue();
								field.blur();
								field.reset();
								Builder.quickOpen(val);
							}
						}
					},
					store: mystore=new Ext.data.JsonStore({
						autoDestroy: true,
						url: "?event=builder:searchItem",
						idProperty: "id",
						fields: ["id", "name", "type"]
					})
				}]
			}]
		});
		mystore.load();
		
		var contentPanel = new Ext.Panel({
			id: "qwbuilder_contentPanel",
			region: "center",
			xtype: "panel",
			border: false,
			margins: "5 0 0 0",
			layout: "border",
			items: [
				new Ext.TabPanel({
					id: "qwbuilder_startupPanel",
					region: "center",
					xtype: "tabpanel",
			        enableTabScroll:true,
					activeTab: 0,
					items: [{
						title: "Help",
						iconCls: "HelpTabIcon",
						xtype: "panel",
						html: $("help").innerHTML,
						tbar: (Builder.isDeveloper || Builder.isAdmin ? [{
							xtype: "button", 
							text: "Invalidate Cache", 
							iconCls: "flush", 
							menu: {
								items: [{
									text: "Database Cache",
									handler: function() {
										Ext.Msg.confirm("Warning!", "Do you really want to flush the Database cache? "+(Builder.productionEnvironment ? "Do this only if you really know what you are doing. Flushing the database cache in a production environment can potentially lead to massive performance degradation for some time." : ""), function(btn) {
											if (btn == "yes") {
												invoke("builder:flushDBCache", function(req){
													if (req.responseText == "success") {
														Ext.ux.util.msg("Flushing completed", "The database cache has been flushed successfully.");
													}
												});
											}
										})
									}									
								}, {
									text: "Web Content Cache",
									handler: function() {
										Ext.Msg.confirm("Warning!", "Invalidating the web content cache will remove all cached images, icons, LESS/CSS stylesheets and pages. Do you want to continue?", function(btn) {
											if (btn == "yes") {
												invoke("builder:flushWebCache", function(req){
													if (req.responseText == "success") {
														Ext.ux.util.msg("Invalidation completed", "The web content cache has been invalidated.");
													}
												});
											}
										})
									}
								}, {
									text: "Module Cache",
									handler: function() {
										Ext.Msg.confirm("Warning!", "Purging the module cache will remove all currently generated modules from the file system. Do you want to continue?", function(btn) {
											if (btn == "yes") {
												invoke('builder:flushCustomModules', function(req){
													if (req.responseText == 'success') {
														Ext.ux.util.msg('Purging completed', 'The module cache has been purged.');
													}
												});
											}
										});
									}
								}, {
									text: "Log files",
									handler: function() {
										Ext.Msg.confirm("Hint", "Invalidating the log files will remove any previously logged entries. Do you want to continue?", function(btn) {
											if (btn == "yes") {
												invoke("builder:flushLogs", function(req){
													if (req.responseText == "success") {
														Ext.ux.util.msg("Invalidation completed", "The log files have been cleaned up.");
													}
												});												
											}
										})
									}
								}]
							}
						}, "-", {
							xtype: "button",
							text: "Database",
							iconCls: "run",
							handler: function() {
								Builder.queryTest();								
							}
						}, "-", (Builder.isDeveloper || Builder.isAdmin ? {
							xtype: "button",
							id: "logs",
							iconCls: "handler",
							text: "Log Files",
							menu: {
								items: window.logs,
								listeners: {
									beforeshow: function(menu) {
										invoke(null, "builder:updateLogs", null, false, function(req) {
											menu.removeAll();
											var data = eval("("+req.responseText+")");
											$A(data.data).each(function(item) {
												menu.add({
													text: item,
													handler: function() {
														window.open("?event=builder:showLog&log="+item, "logs");														
													}
												});
											});
											menu.doLayout();
										});
									}
								}
							}
						} : ""),
						(Builder.isDeveloper || Builder.isAdmin ? "-" : ""),
						(Builder.isDeveloper || Builder.isAdmin ? {
							xtype: "button",
							id: "profiler",
							disabled: !window.profilerLogs,
							style: "margin-right: 10px;",
							iconCls: "debug",
							text: "Profiler",
							handler: function() {
								Builder.addTab("templates/builder/html/showProfiler.html", "System Profiler", "sys-prof", "debug");
							}
						} : "")
						] : null)
					}],
					listeners: {
						tabchange: function(tab, content) {
							if (content.el != null && content.el.dom.hasFocus != null) {
								setTimeout(function() {
								       Builder.focusBespin(content.el.dom.hasFocus);
								}, 50);
							}
							var id = content.getId();
							var idParts = id.split(/_/g);
							var type = idParts[1];
							switch (type) {
								case "l":
								case "t":
									Ext.getCmp("qwbuilder_navarea").getLayout().setActiveItem("qwbuilder_libsPanel");
									break;
								case "h":
								case "d":
									Ext.getCmp("qwbuilder_navarea").getLayout().setActiveItem("qwbuilder_detailsPanel");
									break;
								case "c":
								case "m":
								case "rm":
									Ext.getCmp("qwbuilder_navarea").getLayout().setActiveItem("qwbuilder_modulePanel");
									break;
								case "db":
									Ext.getCmp("qwbuilder_navarea").getLayout().setActiveItem("qwbuilder_dbPanel");
									break;
							}
						}
					}
				})
			]
		});

		var handlerPanel = new Ext.tree.TreePanel({
			id: "qwbuilder_handlerPanel",
			title: "Event Handlers",
			xtype: "treepanel",
			region: "center",
			border: false,
			split: true,
			height: 200,
			width: 150,
			minSize: 120,
			maxSize: 540, 
			autoScroll: true,
			root: Builder.handlerRoot,
			rootVisible: false,
			tbar: [{
				text: "Add",
				id: "qwbuilder_handlerPanel_addEvent",
				iconCls: "add",
				handler: Builder.addHandler
			}, "-", {
				text: "Edit",
				iconCls: "edit",
				handler: function() {
					Builder.editHandler(Ext.getCmp("qwbuilder_handlerPanel").getSelectionModel().getSelectedNode());
				}
			}, "-", {
				text: "Run",
				iconCls: "run",
				handler: function() {
					Builder.runHandler(Builder.currentModule.text, Ext.getCmp("qwbuilder_handlerPanel").getSelectionModel().getSelectedNode().text);
				}
			}, "-", {
				text: "Delete",
				id: "qwbuilder_handlerPanel_deleteEvent",
				iconCls: "delete",
				handler: function() {
					Builder.delHandler(Ext.getCmp("qwbuilder_handlerPanel").getSelectionModel().getSelectedNode());
				}
			}, "-"],
			listeners: {
				dblclick: function(n){
					Builder.editHandler(n);
				},
				contextmenu: function(n, e) {
					e.preventDefault();
					var menu = new Ext.menu.Menu({
						items: [{
							text: "Edit Event",
							iconCls: "edit",
							handler: function() {
								Builder.editHandler(n);
							}
						}, {
							text: "Run Event",
							iconCls: "run",
							handler: function(){
								Builder.runHandler(Builder.currentModule.text, n.text);
							}
						}, {
							text: "Delete Event",
							iconCls: "delete",
							disabled: (parseInt(Builder.currentModule.id) < 0),
							id: "qwbuilder_handlerMenu_deleteEvent",
							handler: function() {
								Builder.delHandler(n);
							}
						}]
					}).showAt(e.getXY());					
				}				
			}			
		});
		var dataPanel = new Ext.tree.TreePanel({
			id: "qwbuilder_dataPanel",
			title: "Data Queries",
			xtype: "treepanel",
			region: "south",
			border: false,
			height: 200,
			width: 150,
			minSize: 120,
			maxSize: 540, 
			split: true,
			autoScroll: true,
			root: Builder.dataRoot,
			rootVisible: false,
			tbar: [{
				text: "Add",
				iconCls: "add",
				handler: Builder.addData
			}, "-", {
				text: "Edit",
				iconCls: "edit",
				handler: function() {
					Builder.editData(Ext.getCmp("qwbuilder_dataPanel").getSelectionModel().getSelectedNode());
				}
			}, "-", {
				xtype: "button",
				text: "SQL Query",
				iconCls: "run",
				handler: function(e) {
					Builder.queryTest();
				}
			},"-",{
				text: "Delete",
				iconCls: "delete",
				handler: function() {
					Builder.delData(Ext.getCmp("qwbuilder_dataPanel").getSelectionModel().getSelectedNode());
				}
			}, "-"],
			listeners: {
				dblclick: function(n) {
					Builder.editData(n);
				},
				contextmenu: function(n, e) {
					e.preventDefault();
					var menu = new Ext.menu.Menu({
						items: [{
							text: "Edit Query",
							iconCls: "edit",
							handler: function() {
								Builder.editData(n);
								this.hide();
							}
						},{
							text: "Delete Query",
							iconCls: "delete",
							handler: function() {
								Builder.delData(n);
								this.hide();
							}
						}]
					}).showAt(e.getXY());	
				}
			}				
		});
		var modulePanel = new Ext.tree.TreePanel({
			id: "qwbuilder_modulePanel",
			region: "north",
			title: "Modules",
			xtype: "treepanel",
			width: 150,
			minSize: 120,
			maxSize: 240, 
			border: true,
			split: true,
			autoScroll: true,
			root: Builder.root,
			rootVisible: false,
			tbar: [{
				text: "Add",
				iconCls: "add",
				disabled: window.Builder.isAdmin,
				handler: Builder.addModule
			}, "-", (!window.Builder.isAdmin ? {
				text: "Edit",
				iconCls: "edit",
				disabled: window.Builder.isAdmin,
				handler: function() {
					Builder.editModule(Ext.getCmp("qwbuilder_modulePanel").getSelectionModel().getSelectedNode());
				}
			} : ""), (!window.Builder.isAdmin ? "-" : ""),(window.Builder.isAdmin ? {
				text: "Edit Configuration",
				iconCls: "config",
				handler: function() {
					Builder.editConfiguration(Ext.getCmp("qwbuilder_modulePanel").getSelectionModel().getSelectedNode());
				}		
			} : {
				text: "Options",
				disabled: window.Builder.isAdmin,
				iconCls: "options",
				handler: function() {
					Builder.editModuleOptions(Ext.getCmp("qwbuilder_modulePanel").getSelectionModel().getSelectedNode());
					
				}
			}),"-", {
				text: "Delete",
				iconCls: "delete",
				disabled: window.Builder.isAdmin,
				handler: function() {
					if (Ext.getCmp("qwbuilder_modulePanel").getSelectionModel().getSelectedNode().id < 0) {
						Ext.Msg.alert("Problem", "You cannot remove the global module.");
					} else {
						Builder.delModule(Ext.getCmp("qwbuilder_modulePanel").getSelectionModel().getSelectedNode());
					}
				}
			}, "-"],
			listeners: {
				contextmenu: function(n, e) {
					e.preventDefault();
					var menu = new Ext.menu.Menu({
						items: [(window.Builder.isDeveloper ? ({
							text: "Edit Module",
							iconCls: "edit",
							handler: function() {
								Builder.editModule(n);
								this.hide();
							}
						},{
							text: "Change Options",
							iconCls: "options",
							handler: function() {
								Builder.editModuleOptions(n);
								this.hide();
							}
						},{
							text: "Edit Resources",
							iconCls: "resource",
							disabled: false,
							handler: function() {
								Builder.editModuleResource(n);
							}
						}) : "-"),{
							text: "Edit Configuration",
							iconCls: "config",
							handler: function() {
								Builder.editConfiguration(n);
							}
						},(window.Builder.isDeveloper ? ({
							text: "Delete Module",
							disabled: (n.id < 0 ? true : false),
							iconCls: "delete",
							handler: function() {
								Builder.delModule(n);
								this.hide();
							}
						}) : "-")]
					}).showAt(e.getXY());					
				},
				dblclick: function(n) {
					if (window.Builder.isDeveloper) Builder.editModule(n);
				}
			}
		});
		var libraryPanel = new Ext.tree.TreePanel({
			id: "qwbuilder_libraryPanel",
			region: "center",
			title: "Library",
			xtype: "treepanel",
			width: 150,
			minSize: 120,
			maxSize: 240, 
			border: true,
			split: true,
			autoScroll: true,
			root: Builder.libRoot,
			rootVisible: false,
			tbar: [{
				text: "Add",
				iconCls: "add",
				handler: Builder.addLibrary
			}, "-", {
				text: "Edit",
				iconCls: "edit",
				handler: function() {
					Builder.editLibrary(Ext.getCmp("qwbuilder_libraryPanel").getSelectionModel().getSelectedNode());
				}
			}, "-", {
				text: "Delete",
				iconCls: "delete",
				handler: function() {
					Builder.delLibrary(Ext.getCmp("qwbuilder_libraryPanel").getSelectionModel().getSelectedNode());
				}
			}, "-", {
				text: "Upload",
				iconCls: "library",
				handler: Builder.uploadLibrary
			}],
			listeners: {
				contextmenu: function(n, e) {
					e.preventDefault();
					var menu = new Ext.menu.Menu({
						items: [{
							text: "Edit Library",
							iconCls: "edit",
							handler: function() {
								Builder.editLibrary(n);
								this.hide();
							}
						},{
							text: "Delete Library",
							iconCls: "delete",
							handler: function() {
								Builder.delLibrary(n);
								this.hide();
							}
						}]
					}).showAt(e.getXY());					
				},
				dblclick: function(n) {
					Builder.editLibrary(n);
				}
			}
		});		
		var tagLibPanel = new Ext.tree.TreePanel({
			id: "qwbuilder_tagPanel",
			title: "Tag Library",
			xtype: "treepanel",
			region: "south",
			border: false,
			height: 200,
			width: 150,
			minSize: 120,
			maxSize: 540, 
			split: true,
			autoScroll: true,
			root: Builder.tagRoot,
			rootVisible: false,
			tbar: [{
				text: "Add",
				iconCls: "add",
				handler: Builder.addTag
			}, "-", {
				text: "Edit",
				iconCls: "edit",
				handler: function() {
					Builder.editTag(Ext.getCmp("qwbuilder_tagPanel").getSelectionModel().getSelectedNode());
				}
			}, "-", {
				text: "Delete",
				iconCls: "delete",
				handler: function() {
					Builder.delTag(Ext.getCmp("qwbuilder_tagPanel").getSelectionModel().getSelectedNode());
				}
			}, "-"],
			listeners: {
				dblclick: function(n) {
					Builder.editTag(n);
				},
				contextmenu: function(n, e) {
					e.preventDefault();
					var menu = new Ext.menu.Menu({
						items: [{
							text: "Edit Tag",
							iconCls: "edit",
							handler: function() {
								Builder.editTag(n);
								this.hide();
							}
						},{
							text: "Delete Tag",
							iconCls: "delete",
							handler: function() {
								Builder.delTag(n);
								this.hide();
							}
						}]
					}).showAt(e.getXY());	
				}
			}				
		});	
		var dbPanel = new Ext.tree.TreePanel({
			id: "qwbuilder_dbPanel",
			title: "Database Structure",
			xtype: "treepanel",
			region: "south",
			border: false,
			height: 200,
			width: 150,
			minSize: 120,
			maxSize: 540, 
			split: true,
			autoScroll: true,
			root: Builder.dbRoot,
			rootVisible: false,
			tbar: [{
				text: "Add",
				iconCls: "add",
				handler: Builder.addTable
			}, "-", {
				text: "Edit",
				iconCls: "edit",
				handler: function() {
					Builder.editTable(Ext.getCmp("qwbuilder_dbPanel").getSelectionModel().getSelectedNode());
				}
			}, "-", {
				text: "Delete",
				iconCls: "delete",
				handler: function() {
					Builder.delTable(Ext.getCmp("qwbuilder_dbPanel").getSelectionModel().getSelectedNode());
				}
			}, "-"],
			listeners: {
				dblclick: function(n) {
					Builder.editTable(n);
				},
				contextmenu: function(n, e) {
					e.preventDefault();
					var menu = new Ext.menu.Menu({
						items: [{
							text: "Edit Table",
							iconCls: "edit",
							handler: function() {
								Builder.editTable(n);
								this.hide();
							}
						},{
							text: "Delete Table",
							iconCls: "delete",
							handler: function() {
								Builder.delTable(n);
								this.hide();
							}
						}]
					}).showAt(e.getXY());	
				}
			}				
		});	
		var navItems = [];
		if (window.Builder.isDeveloper || window.Builder.isAdmin) {
			navItems.push(modulePanel);
			if (!window.Builder.isAdmin) {
				navItems.push({
					id: "qwbuilder_detailsPanel",
					title: "Module Contents",
					collapsible: true,
					region: "south",
					xtype: "panel",
					width: 150,
					minSize: 120,
					disabled: true,
					maxSize: 240, 
					border: true,
					split: true,
					layout: "border",
					layoutConfig: {
						align: "stretch",
						pack: "start"
					},
					items: [
						handlerPanel,
						dataPanel
					]
				});
				navItems.push({
					xtype: "panel",
					id: "qwbuilder_libsPanel",
					title: "Libraries",
					collapsible: true,
					region: "south",
					width: 150,
					minSize: 120,
					maxSize: 240,
					border: true,
					split: true,
					layout: "border",
					layoutConfig: {
						align: "stretch",
						pack: "start"
					},
					items: [libraryPanel, tagLibPanel]
				});
			}
			navItems.push(dbPanel);			
		}
		navItems.push({
		   xtype: "treepanel",
		   id: "qwbuilder_langsPanel",
		   title: "Static Content",
		   collapsible: true,
		   region: "south",
		   width: 150,
		   minSize: 120,
		   maxSize: 240,
		   border: true,
		   split: true,
		   autoScroll: true,
		   root: Builder.langRoot,
		   rootVisible: false,
		   tbar: [{
		       text: "Add",
		       menu: {
		          items: [{
		                  text: "Add Top Section", 
		                  iconCls: "folder", 
		                  id: "qwbuilder_langs_cts", 
		                  handler: function() {
		                      // create new section
		                      Builder.createSubSection(Builder.langRoot);
		                  }
		              }, {
		                  text: "Add Sub Section", 
		                  iconCls: "folder", 
		                  id: "qwbuilder_langs_css",
		                  handler: function() {
		                      // create new sub section
                              selNode = Ext.getCmp("qwbuilder_langsPanel").getSelectionModel().getSelectedNode();
                              if (selNode.isLeaf()) {
                                  selNode = selNode.parentNode;
                              }
    		                  Builder.createSubSection(selNode);
		                  }
		              }, {
		                  text: "Add Text", 
		                  iconCls: "locale", 
		                  id: "qwbuilder_langs_ct",
		                  handler: function() {
		                      // create new text
                              selNode = Ext.getCmp("qwbuilder_langsPanel").getSelectionModel().getSelectedNode();
                              if (selNode.isLeaf()) {
                                  selNode = selNode.parentNode;
                              }
                              Builder.createText(selNode);
		                  }
		              }
		          ]
		       },
			   iconCls: "add",
			   handler: function() {
                  selNode = Ext.getCmp("qwbuilder_langsPanel").getSelectionModel().getSelectedNode();
                  Ext.getCmp("qwbuilder_langs_css").setDisabled(selNode == null);
                  Ext.getCmp("qwbuilder_langs_ct").setDisabled(selNode == null);                              
			   }
			}, "-", {
				text: "Edit",
				iconCls: "edit",
				handler: function() {
					var n = Ext.getCmp("qwbuilder_langsPanel").getSelectionModel().getSelectedNode();
					if (n.isLeaf()) {
						Builder.editText(n);
					} else {
						Ext.Msg.alert("Info", "Please select a text in order to edit it.");
					}
				}
			}, "-", {
			   text: "Delete",
			   iconCls: "delete",
			   handler: function() {
			      var node = Ext.getCmp("qwbuilder_langsPanel").getSelectionModel().getSelectedNode();
			      if (node == null) {
			         Ext.Msg.alert("Problem", "Please select an item in order to remove it.");
			      } else {
			          if (node.isLeaf()) {
			              Builder.deleteText(node);
			          } else {
                          Builder.deleteSection(node);
			          }
			      }
			   }
			}, "-"],
			listeners: {
				contextmenu: function(n, e) {
					e.preventDefault();
					var menu = new Ext.menu.Menu({
						items: [{
							text: "Add Sub Section",
							iconCls: "folder",
							handler: function() {
                                selNode = n;
                                if (selNode.isLeaf()) {
                                    selNode = selNode.parentNode;
                                }
                                Builder.createSubSection(selNode);
								this.hide();
							}
						},{
							text: "Add Text",
							iconCls: "locale",
							handler: function() {
		                      // create new text
                                selNode = n;
                                if (selNode.isLeaf()) {
                                    selNode = selNode.parentNode;
                                }
                                Builder.createText(selNode);
								this.hide();
							}
						}, {
						    text: "Delete " + (n.isLeaf() ? "Text" : "Section"),
						    iconCls: "delete",
						    handler: function() {
						       selNode = n;
						       if (selNode.isLeaf()) {
						          Builder.deleteText(selNode);
						       } else {
						          Builder.deleteSection(selNode);
						       }
						    }
						}]
					}).showAt(e.getXY());	
				}
			}
		});
		for (var i = 0; i < Builder.hookedPanels.length; i++) {
			navItems.push(Builder.hookedPanels[i]);			
		}
		var viewport = new Ext.Viewport({
			layout: "border",
			items: [
				headerPanel,
				{
					layout: "accordion",
					id: "qwbuilder_navarea",
					title: "Navigation",
					region: "west",
					collapsible: true,
					border: false,
					split: true,
					margins: "5 0 0 1",
					width: 275,
					minSize: 100,
					maxSize: 500,
					items: navItems
				},
				contentPanel, {
					xtype: "panel",
					region: "east",
					id: "sb_panel",
					autoScroll: true,
					html: $("shoutbox").innerHTML,
					title: "Developer Chat",
					collapsible: true,
					width: 220
				}
			]
		});
		
		Builder.registerShortCut(document, [{
			key: Event.KEY_LEFT,
			alt: true,
			callback: Builder.previousTab = function(e){
				var spanel = Ext.getCmp("qwbuilder_startupPanel");
				var cactive = spanel.getActiveTab();
				var prev = -1;
				spanel.items.each(function(item, key){
					if (item == this) {
						prev = key - 1;
					}
				}.bind(cactive));
				if (prev >= 0) {
					spanel.setActiveTab(prev);
					spanel.getActiveTab().el.dom.hasFocus && Builder.focusBespin(spanel.getActiveTab().el.dom.hasFocus);
				}
			}
		},{
			key: Event.KEY_RIGHT,
			alt: true,
			callback: Builder.nextTab = function(e) {
				var spanel = Ext.getCmp("qwbuilder_startupPanel");
				var cactive = spanel.getActiveTab();
				var next = -1;
				spanel.items.each(function(item, key){
					if (item == this) {
						next = key + 1;
					}
				}.bind(cactive));
				if (next >= 0 && next < spanel.items.length) {
					spanel.setActiveTab(next);
					spanel.getActiveTab().el.dom.hasFocus && Builder.focusBespin(spanel.getActiveTab().el.dom.hasFocus);
				}
			}
		},{
			key: "Q",
			callback: Builder.closeCurrentTab = function(e) {
				var spanel = Ext.getCmp("qwbuilder_startupPanel");
				if (spanel.getActiveTab().initialConfig.closable) {
					spanel.remove(spanel.getActiveTab());
					spanel.getActiveTab().el.dom.hasFocus && Builder.focusBespin(spanel.getActiveTab().el.dom.hasFocus);
				}
			}
		},{
			key: "D",
			callback: function(e) {
				Builder.quickOpen();
			}
		},{
			key: "A",
			callback: function(e) {
				if (window.Builder.isDeveloper || window.Builder.isAdmin) {
					Builder.queryTest();
				}
			}
		}]);
		Builder.dold = (new Date()).getTime();
		
		if (openedPanel.length > 0) {
    		Ext.getCmp(openedPanel).expand(true);
		}
		setTimeout(function() {
			Ext.getCmp("sb_panel").collapse();
		}, 3000);
	    new PeriodicalExecuter(function(pe){
	    	new Ajax.Request("builder.crc32", {
				method: "get",
				requestHeaders: {
//					"If-Modified-Since": (new Date(Builder.dold)).toGMTString(),
//					"If-None-Match": Builder.detag 
				}, 
				onSuccess: function(req) {
					var date = new Date(req.getHeader("Last-Modified"));
					var dnew = date.getTime();
//					if (dnew > Builder.dold) {
						Builder.dold = dnew;
						Builder.detag = req.getHeader("Etag");
						// fetch new content
						var obj = eval("("+req.responseText+")");
						/*
						 * obj array will look like:
						 * {"h_html_9":  {"user": "Testuser", "uid": "9584737"},
						 *  "m_js_6": 121232345
						 * }
						 */
						$$(".blockable").each(function(item) {
							if (!item.up().dirty) {
								if (item.up().hasClassName("dirty") && (!obj[item.up().id] || obj[item.up().id].uid == window.uid)) {
									item.hide();
									Builder.enableBespin(item.up().id);
									item.up().removeClassName("dirty");
									// reload editor content
									Builder.refreshBespin(item.up().id);
								} else if (obj[item.up().id] && !item.up().hasClassName("dirty") && obj[item.up().id].uid != window.uid) {
									item.update('Currently being modified by '+obj[item.up().id].user);
									item.show();
									Builder.disableBespin(item.up().id);
									item.up().addClassName("dirty");
								}
							}
						});
//					}
				}
			});
	    }, 5);
	}