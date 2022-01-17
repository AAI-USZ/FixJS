function(serviceRegistry, commandService, explorer, toolbarId, selectionTools, fileClient) {
		
		function displayErrorOnStatus(error) {
			
			if (error.status === 401 || error.status === 403)
				return;
			
			var display = [];
			
			display.Severity = "Error"; //$NON-NLS-0$
			display.HTML = false;
			
			try {
				var resp = JSON.parse(error.responseText);
				display.Message = resp.DetailedMessage ? resp.DetailedMessage : resp.Message;
			} catch (Exception) {
				display.Message = error.message;
			}
			
			serviceRegistry.getService("orion.page.message").setProgressResult(display); //$NON-NLS-0$
		}
		
		// Git repository configuration
		
		var addConfigParameters = new mCommands.ParametersDescription([new mCommands.CommandParameter('key', 'text', messages['Key:']),  //$NON-NLS-1$ //$NON-NLS-0$
		                                                               new mCommands.CommandParameter('value', 'text', messages['Value:'])]); //$NON-NLS-1$ //$NON-NLS-0$
		
		var addConfigEntryCommand = new mCommands.Command({
			name: messages["New Configuration Entry"],
			tooltip: "Add a new entry to the repository configuration", //$NON-NLS-0$
			imageClass: "core-sprite-add", //$NON-NLS-0$
			id: "eclipse.orion.git.addConfigEntryCommand", //$NON-NLS-0$
			parameters: addConfigParameters,
			callback: function(data) {
				var item = data.items;
				var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
				if (data.parameters.valueFor("key") && data.parameters.valueFor("value")){ //$NON-NLS-1$ //$NON-NLS-0$
					gitService.addCloneConfigurationProperty(item.ConfigLocation, data.parameters.valueFor("key"), data.parameters.valueFor("value")).then( //$NON-NLS-1$ //$NON-NLS-0$
						function(jsonData){
							dojo.hitch(explorer, explorer.changedItem)(item);
						}, displayErrorOnStatus
					);
				}
			}
		});
		commandService.addCommand(addConfigEntryCommand);
		
		var editConfigParameters = new mCommands.ParametersDescription([new mCommands.CommandParameter('value', 'text', messages['Value:'])]); //$NON-NLS-1$ //$NON-NLS-0$
		
		var editConfigEntryCommand = new mCommands.Command({
			name: messages["Edit"],
			tooltip: messages["Edit the configuration entry"],
			imageClass: "core-sprite-edit", //$NON-NLS-0$
			id: "eclipse.orion.git.editConfigEntryCommand", //$NON-NLS-0$
			parameters: editConfigParameters,
			callback: function(data) {
				var item = data.items;
				var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
				if (data.parameters.valueFor("value")){ //$NON-NLS-0$
					gitService.editCloneConfigurationProperty(item.Location, data.parameters.valueFor("value")).then( //$NON-NLS-0$
						function(jsonData){
							dojo.hitch(explorer, explorer.changedItem)(item);
						}, displayErrorOnStatus
					);
				}
			},
			visibleWhen: function(item) {
				return (item.Key && item.Value && item.Location);
			}
		});
		commandService.addCommand(editConfigEntryCommand);
		
		var deleteConfigEntryCommand = new mCommands.Command({
			name: messages['Delete'],
			tooltip: messages["Delete the configuration entry"],
			imageClass: "core-sprite-delete", //$NON-NLS-0$
			id: "eclipse.orion.git.deleteConfigEntryCommand", //$NON-NLS-0$
			callback: dojo.hitch(this, function(data) {
				var item = data.items;
				var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
				if (confirm(dojo.string.substitute(messages["Are you sure you want to delete ${0}?"], [item.Key]))) {
					gitService.deleteCloneConfigurationProperty(item.Location).then(
						function(jsonData) {
							dojo.hitch(explorer, explorer.changedItem)(item);
						}, displayErrorOnStatus
					);
				}
			}),
			visibleWhen: function(item) {
				return (item.Key && item.Value && item.Location);
			}
		});
		commandService.addCommand(deleteConfigEntryCommand);
		
		//
		
		var cloneParameters = new mCommands.ParametersDescription([new mCommands.CommandParameter("url", "url", messages['Repository URL:'])], {hasOptionalParameters: true}); //$NON-NLS-1$ //$NON-NLS-0$

		function forceSingleItem(item) {
			if (dojo.isArray(item)) {
				if (item.length > 1) {
					item = {};
				} else {
					item = item[0];
				}
			}
			return item;
		}

		var cloneGitRepositoryCommand = new mCommands.Command({
			name : messages["Clone Repository"],
			tooltip : messages["Clone an existing Git repository to a folder"],
			id : "eclipse.cloneGitRepository", //$NON-NLS-0$
			parameters: cloneParameters,
			callback : function(data) {
				var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
				var cloneFunction = function(gitUrl, path, name) {
					exports.getDefaultSshOptions(serviceRegistry).then(function(options) {
						var func = arguments.callee;
						serviceRegistry.getService("orion.page.message").createProgressMonitor(gitService.cloneGitRepository(name, gitUrl, path, explorer.defaultPath, options.gitSshUsername, options.gitSshPassword, options.knownHosts, //$NON-NLS-0$
								options.gitPrivateKey, options.gitPassphrase),
								messages["Cloning repository: "] + gitUrl).deferred.then(function(jsonData, secondArg) {
							exports.handleProgressServiceResponse(jsonData, options, serviceRegistry, function(jsonData) {
								if (explorer.changedItem) {
									dojo.hitch(explorer, explorer.changedItem)();
								}
							}, func, messages['Clone Git Repository']);
						}, function(jsonData, secondArg) {
							exports.handleProgressServiceResponse(jsonData, options, serviceRegistry, function() {}, func, messages['Clone Git Repository']);
						});
					});
				};
				if (data.parameters.valueFor("url") && !data.parameters.optionsRequested) { //$NON-NLS-0$
					cloneFunction(data.parameters.valueFor("url")); //$NON-NLS-0$
				} else {
					var dialog = new orion.git.widgets.CloneGitRepositoryDialog({
						serviceRegistry: serviceRegistry,
						fileClient: fileClient,
						url: data.parameters.valueFor("url"), //$NON-NLS-0$
						alwaysShowAdvanced: data.parameters.optionsRequested,
						func: cloneFunction
					});
							
					dialog.startup();
					dialog.show();
				}
			},
			visibleWhen : function(item) {
				return true;
			}
		});
		commandService.addCommand(cloneGitRepositoryCommand);
		
		var cloneGitRepositoryCommandPullReq = new mCommands.Command({
			name : messages["Clone Repository"],
			tooltip : messages["Clone an existing Git repository to a folder"],
			id : "eclipse.cloneGitRepositoryPullReq", //$NON-NLS-0$
			//parameters: cloneParameters,
			callback : function(data) {
				var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
				var cloneFunction = function(gitUrl, path, name) {
					exports.getDefaultSshOptions(serviceRegistry).then(function(options) {
						var func = arguments.callee;
						serviceRegistry.getService("orion.page.message").createProgressMonitor(gitService.cloneGitRepository(name, gitUrl, path, explorer.defaultPath, options.gitSshUsername, options.gitSshPassword, options.knownHosts, //$NON-NLS-0$
								options.gitPrivateKey, options.gitPassphrase),
								messages["Cloning repository: "] + gitUrl).deferred.then(function(jsonData, secondArg) {
							exports.handleProgressServiceResponse(jsonData, options, serviceRegistry, function(jsonData) {
								if (explorer.changedItem) {
									dojo.hitch(explorer, explorer.changedItem)();
								}
							}, func, messages['Clone Git Repository']);
						}, function(jsonData, secondArg) {
							exports.handleProgressServiceResponse(jsonData, options, serviceRegistry, function() {}, func, messages['Clone Git Repository']);
						});
					});
				};
				var dialog = new orion.git.widgets.CloneGitRepositoryDialog({
					serviceRegistry: serviceRegistry,
					fileClient: fileClient,
					url: data.userData,
					alwaysShowAdvanced: false,
					func: cloneFunction
				});
						
				dialog.startup();
				dialog.show();

			},
			visibleWhen : function(item) {
				return true;
			}
		});
		commandService.addCommand(cloneGitRepositoryCommandPullReq);

		var initRepositoryParameters = new mCommands.ParametersDescription([new mCommands.CommandParameter("folderName", "text", messages['New folder:'])], {hasOptionalParameters: true}); //$NON-NLS-1$ //$NON-NLS-0$
		
		var initGitRepositoryCommand = new mCommands.Command({
			name : messages["Init Repository"],
			tooltip : messages["Create a new Git repository in a new folder"],
			id : "eclipse.initGitRepository", //$NON-NLS-0$
			parameters: initRepositoryParameters,
			callback : function(data) {
				var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
				var initRepositoryFunction = function(gitUrl, path, name) {
					exports.getDefaultSshOptions(serviceRegistry).then(function(options){
						var func = arguments.callee;
						serviceRegistry.getService("orion.page.message").createProgressMonitor(gitService.cloneGitRepository(name, gitUrl, path, explorer.defaultPath), //$NON-NLS-0$
								messages["Initializing repository: "] + name).deferred.then(function(jsonData, secondArg){
							exports.handleProgressServiceResponse(jsonData, options, serviceRegistry, function(jsonData){
								if(explorer.changedItem)
									dojo.hitch(explorer, explorer.changedItem)();
							}, func, messages["Init Git Repository"]);
						}, function(jsonData, secondArg) {
							exports.handleProgressServiceResponse(jsonData, options, serviceRegistry, function() {}, func, messages['Init Git Repository']);
						});
					});
				};
				
				if (data.parameters.valueFor("folderName") && !data.parameters.optionsRequested) { //$NON-NLS-0$
					initRepositoryFunction(null, null, data.parameters.valueFor("folderName")); //$NON-NLS-0$
				} else {
					var dialog = new orion.git.widgets.CloneGitRepositoryDialog({
						serviceRegistry: serviceRegistry,
						title: messages['Init Git Repository'],
						fileClient: fileClient,
						advancedOnly: true,
						func: initRepositoryFunction
					});
							
					dialog.startup();
					dialog.show();
				}
			},
			visibleWhen : function(item) {
				return true;
			}
		});
		commandService.addCommand(initGitRepositoryCommand);

		var deleteCommand = new mCommands.Command({
			name: messages['Delete'], // "Delete Repository"
			tooltip: messages["Delete the repository"],
			imageClass: "core-sprite-delete", //$NON-NLS-0$
			id: "eclipse.git.deleteClone", //$NON-NLS-0$
			visibleWhen: function(item) {
				return item.Type === "Clone";
				
//				var items = dojo.isArray(item) ? item : [item];
//				if (items.length === 0) {
//					return false;
//				}
//				for (var i=0; i < items.length; i++) {
//					if (items[i].Type !== "Clone") { //$NON-NLS-0$
//						return false;
//					}
//				}
//				return true;
			},
			callback: function(data) {
				var item = data.items;
				var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
				if(dojo.isArray(item)){
					if(confirm(dojo.string.substitute(messages["Are you sure you want do delete ${0} repositories?"], [item.length]))){
						var alreadyDeleted = 0;
						for(var i=0; i<item.length; i++){
							gitService.removeGitRepository(item[i].Location).then(
									function(jsonData){
										alreadyDeleted++;
										if(alreadyDeleted >= item.length && explorer.changedItem){
											dojo.hitch(explorer, explorer.changedItem)();
										}
									}, displayErrorOnStatus);
						}
					}
				} else {
					if(confirm(dojo.string.substitute(messages['Are you sure you want to delete ${0}?'], [item.Name])))
						gitService.removeGitRepository(item.Location).then(
							function(jsonData){
								if(explorer.changedItem){
									dojo.hitch(explorer, explorer.changedItem)();
								}
							},
							displayErrorOnStatus);
				}
				
			}
		});
		commandService.addCommand(deleteCommand);

		var applyPatchCommand = new mCommands.Command({
			name : messages['Apply Patch'],
			tooltip: messages["Apply a patch on the selected repository"],
			id : "eclipse.orion.git.applyPatch", //$NON-NLS-0$
			imageClass: "git-sprite-apply_patch", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			callback: function(data) {
				var item = forceSingleItem(data.items);
				var dialog = new orion.git.widgets.ApplyPatchDialog({
					title: messages['Apply Patch'],
					diffLocation: item.DiffLocation
				});
				dialog.startup();
				dialog.show();
			},
			visibleWhen : function(item) {
				return item.Type === "Clone" ; //$NON-NLS-0$
			}
		});
		commandService.addCommand(applyPatchCommand);
		
		var showContentCommand = new mCommands.Command({
			name : messages["Show content"],
			tooltip: messages['Apply a patch on the selected repository'],
			id : "eclipse.orion.git.showContent", //$NON-NLS-0$
			imageClass: "git-sprite-apply_patch", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			callback: function(data) {
				var item = forceSingleItem(data.items);
				var dialog = new orion.git.widgets.ContentDialog({
					title: messages['Content'],
					diffLocation: item.DiffLocation
				});
						dialog.startup();
						dialog.show();
	
			}
			//visibleWhen : function(item) {
				//return item.Type === "Clone" ;
			//}
		});
		commandService.addCommand(showContentCommand);
		
		var openCommitParameters = new mCommands.ParametersDescription([new mCommands.CommandParameter("commitName", "text", messages["Commit name:"])], {hasOptionalParameters: true}); //$NON-NLS-1$ //$NON-NLS-0$
		
		var openCommitCommand = new mCommands.Command({
			name : messages["Open Commit"],
			tooltip: messages["Open the commit with the given name"],
			id : "eclipse.orion.git.openCommitCommand", //$NON-NLS-0$
			imageClass: "git-sprite-apply_patch", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			parameters: openCommitParameters,
			callback: function(data) {
				var findCommitLocation = function (repositories, commitName, deferred) {
					if (deferred == null)
						deferred = new dojo.Deferred();
					
					if (repositories.length > 0) {
						serviceRegistry.getService("orion.git.provider").doGitLog( //$NON-NLS-0$
							"/gitapi/commit/" + data.parameters.valueFor("commitName") + repositories[0].ContentLocation + "?page=1&pageSize=1", null, null, messages['Looking for the commit']).then( //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
							function(resp){
								deferred.callback(resp.Children[0].Location);
							},
							function(error) {
								findCommitLocation(repositories.slice(1), commitName, deferred);
							}
						);
					} else {
						deferred.errback();
					}
					
					return deferred;
				};
				
				var openCommit = function(repositories) {
					if (data.parameters.optionsRequested) {
						new orion.git.widgets.OpenCommitDialog(
							{repositories: repositories, serviceRegistry: serviceRegistry, commitName: data.parameters.valueFor("commitName")} //$NON-NLS-0$
						).show();
					} else {
						serviceRegistry.getService("orion.page.message").setProgressMessage(messages['Looking for the commit']); //$NON-NLS-0$
						findCommitLocation(repositories, data.parameters.valueFor("commitName")).then( //$NON-NLS-0$
							function(commitLocation){
								if(commitLocation !== null){
									var commitPageURL = "/git/git-commit.html#" + commitLocation + "?page=1&pageSize=1"; //$NON-NLS-1$ //$NON-NLS-0$
									window.open(commitPageURL);
								}
							}, function () {
								var display = [];
								display.Severity = "warning"; //$NON-NLS-0$
								display.HTML = false;
								display.Message = messages["No commits found"];
								serviceRegistry.getService("orion.page.message").setProgressResult(display); //$NON-NLS-0$
							}
						);
					}	
				};

				if (data.items.Type === "Clone") { //$NON-NLS-0$
					var repositories = [data.items];
					openCommit(repositories);
				} else if (data.items.CloneLocation){
					serviceRegistry.getService("orion.git.provider").getGitClone(data.items.CloneLocation).then( //$NON-NLS-0$
						function(jsonData){
							var repositories = jsonData.Children;
							openCommit(repositories);
						}
					);
				} else {
					var repositories = data.items;
					openCommit(repositories);
				}
			},
			visibleWhen : function(item) {
				return item.Type === "Clone" || item.CloneLocation || (item.length > 1 && item[0].Type === "Clone") ; //$NON-NLS-1$ //$NON-NLS-0$
			}
		});
		commandService.addCommand(openCommitCommand);
	}