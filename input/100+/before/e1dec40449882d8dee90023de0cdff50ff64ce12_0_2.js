function(serviceRegistry, commandService, explorer, toolbarId) {
		
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
		
		// TODO: not used by the git clone navigator, could be removed
		var linkRepoCommand = new mCommands.Command({
			name: messages["Link Repository"],
			imageClass: "core-sprite-link", //$NON-NLS-0$
			id: "eclipse.linkRepository", //$NON-NLS-0$
			callback: function(data) {
				var dialog = new orion.widgets.NewItemDialog({
					title: messages['Link Repository'],
					label: messages["Folder name:"],
					func:  function(name, url, create){
						var service = serviceRegistry.getService("orion.core.file");							 //$NON-NLS-0$
						service.loadWorkspace("").then(function(loadedWorkspace){
							service.createProject(loadedWorkspace.Location, name, data.items.ContentLocation, false).then(
									function(jsonResp){
										alert(messages["Repository was linked to "] + jsonResp.Name);
										service.read(jsonResp.ContentLocation, true).then(function(jsonData){
											window.location.replace(require.toUrl("navigate/table.html")+"#"+jsonData.ChildrenLocation); //redirect to the workspace to see the linked resource //$NON-NLS-1$ //$NON-NLS-0$
										});
									}
								);
						});
					},
					advanced: false
				});
				dialog.startup();
				dialog.show();
			},
			visibleWhen: function(item) {
				if(item.ContentLocation){
					return true;
				}
				return false;
				}
			});
		commandService.addCommand(linkRepoCommand);

		var checkoutTagCommand = new mCommands.Command({
			name: messages['Checkout'],
			tooltip: messages["Checkout the current tag, creating a local branch based on its contents."],
			imageClass: "git-sprite-checkout", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			id: "eclipse.checkoutTag", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				function getBranchItem(){
					if (item.Repository)
						return item.Repository.BranchLocation;
					
					for(var child_no in item.parent.parent.children){
						if(item.parent.parent.children[child_no].Name==="Branches"){ //$NON-NLS-0$
							return item.parent.parent.children[child_no];
						}
					}
					return item.parent.parent;
				}

				exports.getNewItemName(item, explorer, false, data.domNode.id, "tag_"+item.Name, function(name){ //$NON-NLS-0$
					if(!name && name==""){
						return;
					}
								
					var repositoryLocation;
					if (item.Repository != null) {
						repositoryLocation = item.Repository.Location;
					} else {
						repositoryLocation = item.parent.parent.Location;
					}
					var progressService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
					progressService.createProgressMonitor(serviceRegistry.getService("orion.git.provider").checkoutTag(repositoryLocation, item.Name, name), //$NON-NLS-0$
							dojo.string.substitute(messages["Checking out tag ${0}"], [name])).deferred.then(function() {
						dojo.hitch(explorer, explorer.changedItem)(getBranchItem());
					}, displayErrorOnStatus);
				}, undefined, true);
				
			},
			visibleWhen: function(item){
				return item.Type === "Tag"; //$NON-NLS-0$
			}
		});
		commandService.addCommand(checkoutTagCommand);

		var checkoutBranchCommand = new mCommands.Command({
			name: messages['Checkout'],
			tooltip: messages["Checkout the branch or corresponding local branch and make it active. If the remote tracking branch does not have a corresponding local branch, the local branch will be created first."],
			imageClass: "git-sprite-checkout", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			id: "eclipse.checkoutBranch", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				var service = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
				var progressService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
				
				var checkingOutDeferred = new dojo.Deferred();
				progressService.createProgressMonitor(checkingOutDeferred,
					item.Name ? dojo.string.substitute(messages["Checking out branch ${0}..."], [item.Name]) : messages["Checking out branch..."]);
				if (item.Type === "Branch") { //$NON-NLS-0$
					service.checkoutBranch(item.CloneLocation, item.Name).then(
						function(){
							dojo.hitch(explorer, explorer.changedItem)(item.parent);
							checkingOutDeferred.callback();
							progressService.setProgressResult(messages["Branch checked out."]);
						},
						 function(error){
							checkingOutDeferred.callback(); 
							displayErrorOnStatus(error);
						 }
					);
				} else {
					var branchLocation;
					if (item.Repository != null) {
						branchLocation = item.Repository.BranchLocation;
					} else {
						branchLocation = item.parent.parent.BranchLocation;
					}
					
					service.addBranch(branchLocation, null, item.Name).then(
						function(branch){
							service.checkoutBranch(branch.CloneLocation, branch.Name).then(
								function(){
									dojo.hitch(explorer, explorer.changedItem)(item.Repository ? item.Repository.BranchLocation : item.parent.parent.parent);
									progressService.setProgressResult(messages['Branch checked out.']);
								},
								function(error){
									checkingOutDeferred.callback(); 
									displayErrorOnStatus(error);
								}
							);
						},
						function(error){
							checkingOutDeferred.callback(); 
							displayErrorOnStatus(error);
						 }
					);
				}
			},
			visibleWhen: function(item) {
				return item.Type === "Branch" || item.Type === "RemoteTrackingBranch"; //$NON-NLS-1$ //$NON-NLS-0$
			}
		});
		commandService.addCommand(checkoutBranchCommand);

		var branchNameParameters = new mCommands.ParametersDescription([new mCommands.CommandParameter('name', 'text', 'Name:')]); //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$

		var addBranchCommand = new mCommands.Command({
			name: messages["New Branch"],
			tooltip: messages["Add a new local branch to the repository"],
			imageClass: "core-sprite-add", //$NON-NLS-0$
			id: "eclipse.addBranch", //$NON-NLS-0$
			parameters: branchNameParameters,
			callback: function(data) {
				var item = data.items;
				
				var createBranchFunction = function(branchLocation, name) {
					serviceRegistry.getService("orion.git.provider").addBranch(branchLocation, name).then(function() { //$NON-NLS-0$
						dojo.hitch(explorer, explorer.changedItem)(item);
					}, displayErrorOnStatus);
				};
				
				var branchLocation;
				if (item.Type === "Clone") { //$NON-NLS-0$
					branchLocation = item.BranchLocation;
				} else {
					branchLocation = item.Location;
				}
				
				if (data.parameters.valueFor("name") && !data.parameters.optionsRequested) { //$NON-NLS-0$
					createBranchFunction(branchLocation, data.parameters.valueFor("name")); //$NON-NLS-0$
				} else {
					exports.getNewItemName(item, explorer, false, data.domNode.id, messages["Branch name"], function(name) {
						if (!name && name == "") {
							return;
						}		
						createBranchFunction(branchLocation, name);
					});
				}
			},
			visibleWhen: function(item) {
				return (item.GroupNode && item.Name === "Branches") || (item.Type === "Clone" && explorer.parentId === "artifacts"); //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
			}
		});
		commandService.addCommand(addBranchCommand);

		var removeBranchCommand = new mCommands.Command({
			name: messages["Delete"], // "Delete Branch"
			tooltip: messages["Delete the local branch from the repository"],
			imageClass: "core-sprite-delete", //$NON-NLS-0$
			id: "eclipse.removeBranch", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				if (confirm(dojo.string.substitute(messages["Are you sure you want to delete branch ${0}?"], [item.Name]))) {
					serviceRegistry.getService("orion.git.provider").removeBranch(item.Location).then(function() { //$NON-NLS-0$
						if (explorer.changedItem)
							dojo.hitch(explorer, explorer.changedItem)(item.parent);
						else if (explorer.displayBranches)
							dojo.hitch(explorer, explorer.displayBranches)(item.ParentLocation, null);
					}, displayErrorOnStatus);
				}
			},
			visibleWhen: function(item) {
				return item.Type === "Branch" && !item.Current; //$NON-NLS-0$
			}
		});
		commandService.addCommand(removeBranchCommand);

		var removeRemoteBranchCommand = new mCommands.Command({
			name: messages['Delete'], // "Delete Remote Branch",
			tooltip: messages["Delete the remote tracking branch from the repository"],
			imageClass: "core-sprite-delete", //$NON-NLS-0$
			id: "eclipse.removeRemoteBranch", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				if(confirm(dojo.string.substitute(messages["You're going to delete remote branch ${0} and push the change."], [item.Name])+"\n\n"+messages["Are you sure?"])) //$NON-NLS-1$
				exports.getDefaultSshOptions(serviceRegistry).then(function(options){
					var func = arguments.callee;
					var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
					var progressService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
					progressService.createProgressMonitor(gitService.doPush(item.Location, "", false, false,
							options.gitSshUsername, options.gitSshPassword, options.knownHosts, options.gitPrivateKey,
							options.gitPassphrase), messages["Removing remote branch: "] + item.Name).deferred.then(function(remoteJsonData) {
						exports.handleProgressServiceResponse(remoteJsonData, options, serviceRegistry, function(jsonData) {
							if (jsonData.Result.Severity == "Ok") //$NON-NLS-0$
								dojo.hitch(explorer, explorer.changedItem)(item.parent);
						}, func, messages["Delete Remote Branch"]);
					}, function(jsonData, secondArg) {
						exports.handleProgressServiceResponse(jsonData, options, serviceRegistry, function() {}, func, messages['Removing remote branch: '] + item.Name);
					});
				});
			},
			visibleWhen: function(item) {
				return item.Type === "RemoteTrackingBranch"; //$NON-NLS-0$
			}
		});
		commandService.addCommand(removeRemoteBranchCommand);

		var addRemoteParameters = new mCommands.ParametersDescription([new mCommands.CommandParameter('name', 'text', 'Name:'),  //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
		                                                               new mCommands.CommandParameter('url', 'url', 'Url:')]); //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
		
		var addRemoteCommand = new mCommands.Command({
			name: messages["New Remote"],
			tooltip: messages["Add a new remote to the repository"],
			imageClass: "core-sprite-add", //$NON-NLS-0$
			id: "eclipse.addRemote", //$NON-NLS-0$
			parameters: addRemoteParameters,
			callback : function(data) {
				var item = data.items;
				
				var createRemoteFunction = function(remoteLocation, name, url) {
					serviceRegistry.getService("orion.git.provider").addRemote(remoteLocation, name, url).then(function() { //$NON-NLS-0$
						dojo.hitch(explorer, explorer.changedItem)(item);
					}, displayErrorOnStatus);
				};
				
				var remoteLocation;
				if (item.Type === "Clone") { //$NON-NLS-0$
					remoteLocation = item.RemoteLocation;
				} else {
					remoteLocation = item.Location;
				}
				
				if (data.parameters.valueFor("name") && data.parameters.valueFor("url") && !data.parameters.optionsRequested) { //$NON-NLS-1$ //$NON-NLS-0$
					createRemoteFunction(remoteLocation, data.parameters.valueFor("name"), data.parameters.valueFor("url")); //$NON-NLS-1$ //$NON-NLS-0$
				} else {
					var dialog = new orion.git.widgets.AddRemoteDialog({
						func : function(remote, remoteURI){
							createRemoteFunction(remoteLocation, remote, remoteURI);
						}
					});
					dialog.startup();
					dialog.show();
					
				}	
			},
			visibleWhen: function(item) {
				return (item.GroupNode && item.Name === "Remotes") ||  (item.Type === "Clone" && explorer.parentId === "artifacts"); //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
			}
		});
		commandService.addCommand(addRemoteCommand);

		var removeRemoteCommand = new mCommands.Command({
			name: messages['Delete'], // "Delete Remote",
			tooltip: messages["Delete the remote from the repository"],
			imageClass: "core-sprite-delete", //$NON-NLS-0$
			id: "eclipse.removeRemote", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				if (confirm(dojo.string.substitute(messages["Are you sure you want to delete remote ${0}?"], [item.Name]))) {
					serviceRegistry.getService("orion.git.provider").removeRemote(item.Location).then(function() { //$NON-NLS-0$
						dojo.hitch(explorer, explorer.changedItem)(item.parent);
					}, displayErrorOnStatus);
				}
			},
			visibleWhen: function(item) {
				return item.Type === "Remote"; //$NON-NLS-0$
			}
		});
		commandService.addCommand(removeRemoteCommand);

		var pullCommand = new mCommands.Command({
			name : messages["Pull"],
			tooltip: messages["Pull from the repository"],
			imageClass: "git-sprite-pull", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			id : "eclipse.orion.git.pull", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				var path = item.Location;
				exports.getDefaultSshOptions(serviceRegistry).then(function(options) {
					var func = arguments.callee;
					var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
					var statusService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
					
					statusService.createProgressMonitor(gitService.doPull(path, false,
							options.gitSshUsername,
							options.gitSshPassword,
							options.knownHosts,
							options.gitPrivateKey,
							options.gitPassphrase), messages["Pulling : "] + path).deferred.then(function(jsonData) {
						exports.handleProgressServiceResponse(jsonData, options, serviceRegistry, function(jsonData) {
							if (item.Type === "Clone") { //$NON-NLS-0$
								dojo.hitch(explorer, explorer.changedItem)(item);
							}
						}, func, "Pull Git Repository"); //$NON-NLS-0$
					}, function(jsonData, secondArg) {
						exports.handleProgressServiceResponse(jsonData, options, serviceRegistry, function() {}, func, messages["Pull Git Repository"]);
					});
				});
			},
			visibleWhen : function(item) {
				return item.Type === "Clone"; //$NON-NLS-0$
			}
		});
		commandService.addCommand(pullCommand);

		var openGitLog = new mCommands.Command({
			name : messages["Git Log"],
			tooltip: messages["Open the log for the branch"],
			id : "eclipse.openGitLog", //$NON-NLS-0$
			imageClass: "git-sprite-log", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			hrefCallback : function(data) {
				var item = data.items;
				return require.toUrl("git/git-log.html")+"#" + item.CommitLocation + "?page=1"; //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
			},
			visibleWhen : function(item) {
				return item.Type === "Branch" || item.Type === "RemoteTrackingBranch"; //$NON-NLS-1$ //$NON-NLS-0$
			}
		});
		commandService.addCommand(openGitLog);

		var openGitLogAll = new mCommands.Command({
			name : messages['Git Log'],
			tooltip: messages["Open the log for the repository"],
			id : "eclipse.openGitLogAll", //$NON-NLS-0$
			imageClass: "git-sprite-log", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			hrefCallback : function(data) {
				return require.toUrl("git/git-log.html")+"#" + data.items.CommitLocation + "?page=1"; //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
			},
			visibleWhen : function(item) {
				// show only for a repo
				if (!item.CommitLocation || !item.StatusLocation)
					return false;
				return true;
			}
		});
		commandService.addCommand(openGitLogAll);

		var openGitStatus = new mCommands.Command({
			name : messages['Git Status'],
			tooltip: messages["Open the status for the repository"],
			id : "eclipse.openGitStatus", //$NON-NLS-0$
			imageClass: "git-sprite-status", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			hrefCallback : function(data) {
				return require.toUrl(mGitUtil.statusUILocation) + "#" + data.items.StatusLocation; //$NON-NLS-0$
			},
			visibleWhen : function(item) {
				if (!item.StatusLocation)
					return false;
				return true;
			}
		});
		commandService.addCommand(openGitStatus);

		var openCloneContent = new mCommands.Command({
			name : messages["Show in Navigator"],
			tooltip: messages["Show the repository folder in the file navigator"],
			id : "eclipse.openCloneContent", //$NON-NLS-0$
			hrefCallback : function(data) {
				return require.toUrl("navigate/table.html")+"#" + data.items.ContentLocation+"?depth=1"; //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
			},
			visibleWhen : function(item) {
				if (!item.ContentLocation)
					return false;
				return true;
			}
		});
		commandService.addCommand(openCloneContent);

		var compareGitCommits = new mCommands.Command({
			name : messages["Compare With Each Other"],
			imageClass: "git-sprite-open_compare", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			id : "eclipse.compareGitCommits", //$NON-NLS-0$
			hrefCallback : function(data) {
				var item = data.items;
				return serviceRegistry.getService("orion.git.provider").getDiff(item[1].DiffLocation, item[0].Name).then(function(diffLocation) {
					return mCompareUtils.generateCompareHref(diffLocation, {readonly: true});
				});
			},
			visibleWhen : function(item) {
				if(explorer.isDirectory) return false;
				if (dojo.isArray(item) && item.length === 2 && item[0].Type === "Commit" && item[1].Type === "Commit") { //$NON-NLS-1$ //$NON-NLS-0$
						return true;
				}
				return false;
			}
		});
		commandService.addCommand(compareGitCommits);

		var compareWithWorkingTree = new mCommands.Command({
			name : messages["Compare With Working Tree"],
			imageClass: "git-sprite-open_compare", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			id : "eclipse.compareWithWorkingTree", //$NON-NLS-0$
			hrefCallback : function(data) {
				return mCompareUtils.generateCompareHref(data.items.DiffLocation, {});
			},
			visibleWhen : function(item) {
				return item.Type === "Commit" && !explorer.isDirectory; //$NON-NLS-0$
			}
		});
		commandService.addCommand(compareWithWorkingTree);

		var openGitCommit = new mCommands.Command({
			name : messages["Open"],
			id : "eclipse.openGitCommit", //$NON-NLS-0$
			hrefCallback: function(data) {
				return require.toUrl("edit/edit.html")+"#" + data.items.ContentLocation; //$NON-NLS-1$ //$NON-NLS-0$
			},
			visibleWhen : function(item) {
				return item.Type === "Commit" && item.ContentLocation != null && !explorer.isDirectory; //$NON-NLS-0$
			}
		});
		commandService.addCommand(openGitCommit);

		var fetchCommand = new mCommands.Command({
			name: messages["Fetch"],
			tooltip: messages["Fetch from the remote"],
			imageClass: "git-sprite-fetch", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			id: "eclipse.orion.git.fetch", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				var path = item.Location;
				var commandInvocation = data;
				
				var handleResponse = function(jsonData, commandInvocation){
					if (jsonData.JsonData.HostKey){
						commandInvocation.parameters = null;
					} else if (!commandInvocation.optionsRequested){
						if (jsonData.JsonData.User)
							commandInvocation.parameters = new mCommands.ParametersDescription([new mCommands.CommandParameter("sshpassword", "password", messages["SSH Password:"])], {hasOptionalParameters: true}); //$NON-NLS-1$ //$NON-NLS-0$
						else
							commandInvocation.parameters = new mCommands.ParametersDescription([new mCommands.CommandParameter("sshuser", "text", messages["SSH User Name:"]), new mCommands.CommandParameter("sshpassword", "password", messages['SSH Password:'])], {hasOptionalParameters: true}); //$NON-NLS-4$ //$NON-NLS-3$ //$NON-NLS-1$ //$NON-NLS-0$
					}
					
					commandInvocation.errorData = jsonData.JsonData;
					commandService.collectParameters(commandInvocation);
				};
				
				if (commandInvocation.parameters && commandInvocation.parameters.optionsRequested){
					commandInvocation.parameters = null;
					commandInvocation.optionsRequested = true;
					commandService.collectParameters(commandInvocation);
					return;
				}
				
				exports.gatherSshCredentials(serviceRegistry, commandInvocation).then(
					function(options) {
						var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
						var statusService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
						statusService.createProgressMonitor(gitService.doFetch(path, false,
								options.gitSshUsername,
								options.gitSshPassword,
								options.knownHosts,
								options.gitPrivateKey,
								options.gitPassphrase), messages["Fetching remote: "] + path).deferred.then(
							function(jsonData, secondArg) {
								exports.handleProgressServiceResponse2(jsonData, serviceRegistry, 
									function() {
										gitService.getGitRemote(path).then(
											function(jsonData){
												var remoteJsonData = jsonData;
												if (explorer.parentId === "explorer-tree") { //$NON-NLS-0$
													dojo.place(document.createTextNode(messages['Getting git incoming changes...']), "explorer-tree", "only"); //$NON-NLS-2$ //$NON-NLS-1$
													gitService.getLog(remoteJsonData.HeadLocation, remoteJsonData.Id).then(function(loadScopedCommitsList) {
														explorer.renderer.setIncomingCommits(loadScopedCommitsList.Children);
														explorer.loadCommitsList(remoteJsonData.CommitLocation + "?page=1", remoteJsonData, true); //$NON-NLS-0$
													});
												}
												dojo.hitch(explorer, explorer.changedItem)(item);
											}, displayErrorOnStatus
										);
									}, function (jsonData) {
										handleResponse(jsonData, commandInvocation);
									}
								);
							}, function(jsonData, secondArg) {
								exports.handleProgressServiceResponse2(jsonData, serviceRegistry, 
									function() {
									
									}, function (jsonData) {
										handleResponse(jsonData, commandInvocation);
									}
								);
							}
						);
					}
				);
			},
			visibleWhen: function(item) {
				if (item.Type === "RemoteTrackingBranch") //$NON-NLS-0$
					return true;
				if (item.Type === "Remote") //$NON-NLS-0$
					return true;
				if (item.Type === "Commit" && item.toRef && item.toRef.Type === "RemoteTrackingBranch") //$NON-NLS-1$ //$NON-NLS-0$
					return true;
				return false;
			}
		});
		commandService.addCommand(fetchCommand);

		var fetchForceCommand = new mCommands.Command({
			name : messages["Force Fetch"],
			tooltip: messages["Fetch from the remote branch into your remote tracking branch overriding its current content"],
			id : "eclipse.orion.git.fetchForce", //$NON-NLS-0$
			callback: function(data) {			
				if(!confirm(messages["You're going to override content of the remote tracking branch. This can cause the branch to lose commits."]+"\n\n"+messages['Are you sure?'])) //$NON-NLS-1$
					return;
				
				var item = data.items;
				var path = item.Location;
				var commandInvocation = data;
				
				var handleResponse = function(jsonData, commandInvocation){
					if (jsonData.JsonData.HostKey){
						commandInvocation.parameters = null;
					} else if (!commandInvocation.optionsRequested){
						if (jsonData.JsonData.User)
							commandInvocation.parameters = new mCommands.ParametersDescription([new mCommands.CommandParameter("sshpassword", "password", messages['SSH Password:'])], {hasOptionalParameters: true}); //$NON-NLS-1$ //$NON-NLS-0$
						else
							commandInvocation.parameters = new mCommands.ParametersDescription([new mCommands.CommandParameter("sshuser", "text", messages['SSH User Name:']), new mCommands.CommandParameter("sshpassword", "password", messages['SSH Password:'])], {hasOptionalParameters: true}); //$NON-NLS-4$ //$NON-NLS-3$ //$NON-NLS-1$ //$NON-NLS-0$
					}
					
					commandInvocation.errorData = jsonData.JsonData;
					commandService.collectParameters(commandInvocation);
				};
				
				if (commandInvocation.parameters && commandInvocation.parameters.optionsRequested){
					commandInvocation.parameters = null;
					commandInvocation.optionsRequested = true;
					commandService.collectParameters(commandInvocation);
					return;
				}

				exports.gatherSshCredentials(serviceRegistry, commandInvocation).then(
					function(options) {
						var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
						var statusService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
						statusService.createProgressMonitor(gitService.doFetch(path, true,
								options.gitSshUsername,
								options.gitSshPassword,
								options.knownHosts,
								options.gitPrivateKey,
								options.gitPassphrase), messages['Fetching remote: '] + path).deferred.then(
							function(jsonData, secondArg) {
								exports.handleProgressServiceResponse2(jsonData, serviceRegistry, 
									function() {
										gitService.getGitRemote(path).then(
											function(jsonData){
												var remoteJsonData = jsonData;
												if (explorer.parentId === "explorer-tree") { //$NON-NLS-0$
													dojo.place(document.createTextNode(messages['Getting git incoming changes...']), "explorer-tree", "only"); //$NON-NLS-2$ //$NON-NLS-1$
													gitService.getLog(remoteJsonData.HeadLocation, remoteJsonData.Id).then(function(loadScopedCommitsList) {
														explorer.renderer.setIncomingCommits(loadScopedCommitsList.Children);
														explorer.loadCommitsList(remoteJsonData.CommitLocation + "?page=1", remoteJsonData, true); //$NON-NLS-0$
													});
												}
												dojo.hitch(explorer, explorer.changedItem)(item);
											}, displayErrorOnStatus
										);
									}, function (jsonData) {
										handleResponse(jsonData, commandInvocation);
									}
								);
							}, function(jsonData, secondArg) {
								exports.handleProgressServiceResponse2(jsonData, serviceRegistry, 
									function() {
									
									}, function (jsonData) {
										handleResponse(jsonData, commandInvocation);
									}
								);
							}
						);
					}
				);
			},
			visibleWhen : function(item) {
				if (item.Type === "RemoteTrackingBranch") //$NON-NLS-0$
					return true;
				if (item.Type === "Remote") //$NON-NLS-0$
					return true;
				if (item.Type === "Commit" && item.toRef && item.toRef.Type === "RemoteTrackingBranch") //$NON-NLS-1$ //$NON-NLS-0$
					return true;
				return false;
			}
		});
		commandService.addCommand(fetchForceCommand);

		var mergeCommand = new mCommands.Command({
			name : messages["Merge"],
			tooltip: messages["Merge the content from the branch to your active branch"],
			imageClass: "git-sprite-merge", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			id : "eclipse.orion.git.merge", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
				var progressService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
				gitService.doMerge(item.HeadLocation, item.Name, false).then(function(result){
					var display = [];

					if (result.jsonData && (result.jsonData.Result == "FAST_FORWARD" || result.jsonData.Result == "ALREADY_UP_TO_DATE")){ //$NON-NLS-1$ //$NON-NLS-0$
						dojo.query(".treeTableRow").forEach(function(node, i) { //$NON-NLS-0$
							dojo.toggleClass(node, "incomingCommitsdRow", false); //$NON-NLS-0$
						});
						display.Severity = "Ok"; //$NON-NLS-0$
						display.HTML = false;
						display.Message = result.jsonData.Result;
						
						dojo.hitch(explorer, explorer.changedItem)(item);
					} else if(result.jsonData){
						var statusLocation = item.HeadLocation.replace("commit/HEAD", "status"); //$NON-NLS-1$ //$NON-NLS-0$

						display.Severity = "Warning"; //$NON-NLS-0$
						display.HTML = true;
						display.Message = "<span>" + result.jsonData.Result //$NON-NLS-0$
							+ dojo.string.substitute(messages[". Go to ${0}."], ["<a href=\"" + require.toUrl(mGitUtil.statusUILocation) + "#"  //$NON-NLS-2$ //$NON-NLS-1$
							+ statusLocation +"\">"+messages["Git Status page"]+"</a>"])+"</span>"; //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
					} else if(result.error) {
						var statusLocation = item.HeadLocation.replace("commit/HEAD", "status"); //$NON-NLS-1$ //$NON-NLS-0$
						display.Severity = "Error"; //$NON-NLS-0$
						if(result.error.responseText && JSON.parse(result.error.responseText)){
							var resp = JSON.parse(result.error.responseText);
							display.Message = resp.DetailedMessage ? resp.DetailedMessage : resp.Message;
						}else{
							display.Message = result.error.message;
						}
						display.HTML = true;
						display.Message ="<span>" + display.Message + dojo.string.substitute(messages['. Go to ${0}.'], ["<a href=\"" + require.toUrl(mGitUtil.statusUILocation) + "#"  //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
							+ statusLocation + "\">"+messages['Git Status page']+"</a>"])+"</span>"; //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
					}

					progressService.setProgressResult(display);
				}, function (error, ioArgs) {
						var display = [];

						var statusLocation = item.HeadLocation.replace("commit/HEAD", "status"); //$NON-NLS-1$ //$NON-NLS-0$

						display.Severity = "Error"; //$NON-NLS-0$
						display.HTML = true;
						display.Message = "<span>" + dojo.fromJson(ioArgs.xhr.responseText).DetailedMessage //$NON-NLS-0$
						+ dojo.string.substitute(messages['. Go to ${0}.'], ["<a href=\"" + require.toUrl(mGitUtil.statusUILocation) + "#"  //$NON-NLS-2$ //$NON-NLS-1$
						+ statusLocation +"\">"+messages['Git Status page']+"</a>"])+".</span>"; //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
						serviceRegistry.getService("orion.page.message").setProgressResult(display); //$NON-NLS-0$
				});
			},
			visibleWhen : function(item) {
				if (item.Type === "RemoteTrackingBranch") //$NON-NLS-0$
					return true;
				if (item.Type === "Branch" && !item.Current) //$NON-NLS-0$
					return true;
				if (item.Type === "Commit" && item.toRef && item.toRef.Type === "RemoteTrackingBranch") //$NON-NLS-1$ //$NON-NLS-0$
					return true;
				return false;
			}
		});
		commandService.addCommand(mergeCommand);
		
		var mergeSquashCommand = new mCommands.Command({
			name : messages["Merge Squash"],
			tooltip: messages["Squash the content of the branch to the index"],
			imageClass: "git-sprite-merge", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			id : "eclipse.orion.git.mergeSquash", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
				var progressService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
				gitService.doMerge(item.HeadLocation, item.Name, true).then(function(result){
					var display = [];

					if (result.jsonData && (result.jsonData.Result == "FAST_FORWARD_SQUASHED" || result.jsonData.Result == "ALREADY_UP_TO_DATE")){ //$NON-NLS-1$ //$NON-NLS-0$
						dojo.query(".treeTableRow").forEach(function(node, i) { //$NON-NLS-0$
							dojo.toggleClass(node, "incomingCommitsdRow", false); //$NON-NLS-0$
						});
						display.Severity = "Ok"; //$NON-NLS-0$
						display.HTML = false;
						display.Message = result.jsonData.Result;
						
						dojo.hitch(explorer, explorer.changedItem)(item);
					} else if(result.jsonData){
						var statusLocation = item.HeadLocation.replace("commit/HEAD", "status"); //$NON-NLS-1$ //$NON-NLS-0$

						display.Severity = "Warning"; //$NON-NLS-0$
						display.HTML = true;
						display.Message = "<span>" + result.jsonData.Result //$NON-NLS-0$
							+ dojo.string.substitute(messages[". Go to ${0}."], ["<a href=\"" + require.toUrl(mGitUtil.statusUILocation) + "#"  //$NON-NLS-2$ //$NON-NLS-1$
							+ statusLocation +"\">"+messages["Git Status page"]+"</a>"])+"</span>"; //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
					} else if(result.error) {
						var statusLocation = item.HeadLocation.replace("commit/HEAD", "status"); //$NON-NLS-1$ //$NON-NLS-0$
						display.Severity = "Error"; //$NON-NLS-0$
						if(result.error.responseText && JSON.parse(result.error.responseText)){
							var resp = JSON.parse(result.error.responseText);
							display.Message = resp.DetailedMessage ? resp.DetailedMessage : resp.Message;
						}else{
							display.Message = result.error.message;
						}
						display.HTML = true;
						display.Message ="<span>" + display.Message + dojo.string.substitute(messages['. Go to ${0}.'], ["<a href=\"" + require.toUrl(mGitUtil.statusUILocation) + "#"  //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
							+ statusLocation + "\">"+messages['Git Status page']+"</a>"])+"</span>"; //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
					}

					progressService.setProgressResult(display);
				}, function (error, ioArgs) {
						var display = [];

						var statusLocation = item.HeadLocation.replace("commit/HEAD", "status"); //$NON-NLS-1$ //$NON-NLS-0$

						display.Severity = "Error"; //$NON-NLS-0$
						display.HTML = true;
						display.Message = "<span>" + dojo.fromJson(ioArgs.xhr.responseText).DetailedMessage //$NON-NLS-0$
						+ dojo.string.substitute(messages['. Go to ${0}.'], ["<a href=\"" + require.toUrl(mGitUtil.statusUILocation) + "#"  //$NON-NLS-2$ //$NON-NLS-1$
						+ statusLocation +"\">"+messages['Git Status page']+"</a>"])+".</span>"; //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
						serviceRegistry.getService("orion.page.message").setProgressResult(display); //$NON-NLS-0$
				});
			},
			visibleWhen : function(item) {
				if (item.Type === "RemoteTrackingBranch") //$NON-NLS-0$
					return true;
				if (item.Type === "Branch" && !item.Current) //$NON-NLS-0$
					return true;
				if (item.Type === "Commit" && item.toRef && item.toRef.Type === "RemoteTrackingBranch") //$NON-NLS-1$ //$NON-NLS-0$
					return true;
				return false;
			}
		});
		commandService.addCommand(mergeSquashCommand);

		var rebaseCommand = new mCommands.Command({
			name : messages["Rebase"],
			tooltip: messages["Rebase your commits by removing them from the active branch, starting the active branch again based on the latest state of the selected branch "] +
					"and applying each commit again to the updated active branch.", //$NON-NLS-0$
			id : "eclipse.orion.git.rebase", //$NON-NLS-0$
			imageClass: "git-sprite-rebase", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				var progressService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
				progressService.createProgressMonitor(serviceRegistry.getService("orion.git.provider").doRebase(item.HeadLocation, item.Name, "BEGIN"), //$NON-NLS-1$ //$NON-NLS-0$
				item.Name ? messages["Rebase on top of "] + item.Name: messages['Rebase']).deferred.then(function(jsonData){
					var display = [];
					var statusLocation = item.HeadLocation.replace("commit/HEAD", "status"); //$NON-NLS-1$ //$NON-NLS-0$

					if (jsonData.Result == "OK" || jsonData.Result == "FAST_FORWARD" || jsonData.Result == "UP_TO_DATE" ) { //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
						// operation succeeded
						display.Severity = "Ok"; //$NON-NLS-0$
						display.HTML = false;
						display.Message = jsonData.Result;
						
						dojo.hitch(explorer, explorer.changedItem)(item);
					}
					// handle special cases
					else if (jsonData.Result == "STOPPED") { //$NON-NLS-0$
						display.Severity = "Warning"; //$NON-NLS-0$
						display.HTML = true;
						display.Message = "<span>" + jsonData.Result //$NON-NLS-0$
							+ messages[". Some conflicts occurred. Please resolve them and continue, skip patch or abort rebasing"]
							+ dojo.string.substitute(messages['. Go to ${0}.'], ["<a href=\"" + require.toUrl(mGitUtil.statusUILocation) + "#"  //$NON-NLS-2$ //$NON-NLS-1$
							+ statusLocation +"\">"+messages['Git Status page']+"</a>"])+".</span>"; //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
					}
					else if (jsonData.Result == "FAILED_WRONG_REPOSITORY_STATE") { //$NON-NLS-0$
						display.Severity = "Error"; //$NON-NLS-0$
						display.HTML = true;
						display.Message = "<span>" + jsonData.Result //$NON-NLS-0$
							+ messages[". Repository state is invalid (i.e. already during rebasing)"]
							+ dojo.string.substitute(". Go to ${0}.", ["<a href=\"" + require.toUrl(mGitUtil.statusUILocation) + "#"  //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
							+ statusLocation +"\">"+messages['Git Status page']+"</a>"])+".</span>"; //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
					}
					else if (jsonData.Result == "FAILED_UNMERGED_PATHS") { //$NON-NLS-0$
						display.Severity = "Error"; //$NON-NLS-0$
						display.HTML = true;
						display.Message = "<span>" + jsonData.Result //$NON-NLS-0$
							+ messages[". Repository contains unmerged paths"]
							+ dojo.string.substitute(messages['. Go to ${0}.'], ["<a href=\"" + require.toUrl(mGitUtil.statusUILocation) + "#"  //$NON-NLS-2$ //$NON-NLS-1$
   							+ statusLocation +"\">"+messages['Git Status page']+"</a>"])+".</span>"; //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
					}
					else if (jsonData.Result == "FAILED_PENDING_CHANGES") { //$NON-NLS-0$
						display.Severity = "Error"; //$NON-NLS-0$
						display.HTML = true;
						display.Message = "<span>" + jsonData.Result //$NON-NLS-0$
							+ messages[". Repository contains pending changes. Please commit or stash them"]
							+ dojo.string.substitute(messages['. Go to ${0}.'], ["<a href=\"" + require.toUrl(mGitUtil.statusUILocation) + "#"  //$NON-NLS-2$ //$NON-NLS-1$
							+ statusLocation +"\">"+"Git Status page"+"</a>"])+".</span>"; //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
					}
					// handle other cases
					else {
						display.Severity = "Warning"; //$NON-NLS-0$
						display.HTML = true;
						display.Message = "<span>" + jsonData.Result //$NON-NLS-0$
						+ dojo.string.substitute(messages['. Go to ${0}.'], ["<a href=\"" + require.toUrl(mGitUtil.statusUILocation) + "#"  //$NON-NLS-2$ //$NON-NLS-1$
						+ statusLocation +"\">"+messages['Git Status page']+"</a>"])+".</span>"; //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
					} 

					serviceRegistry.getService("orion.page.message").setProgressResult(display); //$NON-NLS-0$
					}, 
					displayErrorOnStatus
				);
			},
			visibleWhen : function(item) {
				this.tooltip = messages["Rebase your commits by removing them from the active branch, "] +
					messages["starting the active branch again based on the latest state of '"] + item.Name + "' " +  //$NON-NLS-1$
					messages["and applying each commit again to the updated active branch."];

				return item.Type === "RemoteTrackingBranch" || (item.Type === "Branch" && !item.Current); //$NON-NLS-1$ //$NON-NLS-0$
			}
		});
		commandService.addCommand(rebaseCommand);
		
		var pushCommand = new mCommands.Command({
			name : messages["Push All"],
			tooltip: messages["Push commits and tags from your local branch into the remote branch"],
			imageClass: "git-sprite-push", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			id : "eclipse.orion.git.push", //$NON-NLS-0$
			callback: function(data) {
				var target;
				var item = data.items;
				var path = dojo.hash();
				if (item.toRef) {
					item = item.toRef;
				}
				var commandInvocation = data;
				
				var parts = item.CloneLocation.split("/");
				
				var handleResponse = function(jsonData, commandInvocation){
					if (jsonData.JsonData.HostKey){
						commandInvocation.parameters = null;
					} else if (!commandInvocation.optionsRequested){
						if (jsonData.JsonData.User)
							commandInvocation.parameters = new mCommands.ParametersDescription([new mCommands.CommandParameter("sshpassword", "password", messages['SSH Password:'])], {hasOptionalParameters: true}); //$NON-NLS-1$ //$NON-NLS-0$
						else
							commandInvocation.parameters = new mCommands.ParametersDescription([new mCommands.CommandParameter("sshuser", "text", messages['SSH User Name:']), new mCommands.CommandParameter("sshpassword", "password", messages['SSH Password:'])], {hasOptionalParameters: true}); //$NON-NLS-4$ //$NON-NLS-3$ //$NON-NLS-1$ //$NON-NLS-0$
					}
					
					commandInvocation.errorData = jsonData.JsonData;
					commandService.collectParameters(commandInvocation);
				};
				
				if (commandInvocation.parameters && commandInvocation.parameters.optionsRequested){
					commandInvocation.parameters = null;
					commandInvocation.optionsRequested = true;
					commandService.collectParameters(commandInvocation);
					return;
				}
				var gitService = serviceRegistry.getService("orion.git.provider");
				
				var handlePush = function(options, location, ref, name, force){
					var progressService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
					progressService.createProgressMonitor(gitService.doPush(location, ref, true, force, //$NON-NLS-0$
							options.gitSshUsername, options.gitSshPassword, options.knownHosts,
							options.gitPrivateKey, options.gitPassphrase), messages['Pushing remote: '] + name).deferred.then(
						function(jsonData){
							exports.handleProgressServiceResponse2(jsonData, serviceRegistry, 
								function() {
									if (explorer.parentId === "explorer-tree") { //$NON-NLS-0$
										if (!jsonData || !jsonData.HttpCode)
											dojo.query(".treeTableRow").forEach(function(node, i) { //$NON-NLS-0$
											dojo.toggleClass(node, "outgoingCommitsdRow", false); //$NON-NLS-0$
										});
									} else {
										dojo.hitch(explorer, explorer.changedItem)();
									}
								}, function (jsonData) {
									handleResponse(jsonData, commandInvocation);
								}
							);
						}, function(jsonData, secondArg) {
							exports.handleProgressServiceResponse2(jsonData, serviceRegistry, 
								function() {
								
								}, function (jsonData) {
									handleResponse(jsonData, commandInvocation);
								}
							);
						}
					);
				};

				gitService.getGitClone(item.CloneLocation).then(
					function(clone){
						var remoteLocation = clone.Children[0].RemoteLocation;
						var locationToChange = clone.Children[0].ConfigLocation;
						
						exports.gatherSshCredentials(serviceRegistry, commandInvocation).then(
							function(options) {
								
								var result = new dojo.Deferred();
								
								if (item.RemoteLocation.length === 1 && item.RemoteLocation[0].Children.length === 1) { //when we push next time - chance to switch saved remote
									result = gitService.getGitRemote(remoteLocation);
								} else {
									var remotes = {};
									remotes.Children = item.RemoteLocation;
									result.resolve(remotes);
									
								}
						
								result.then(
									function(remotes){
										var dialog = new orion.git.widgets.RemotePrompterDialog({
											title: messages["Choose Branch"],
											serviceRegistry: serviceRegistry,
											gitClient: gitService,
											treeRoot: {
												Children: remotes.Children
											},
											hideNewBranch: false,
											func: dojo.hitch(this, 
												function(targetBranch, remote, optional) {
													if(targetBranch === null){
														target = optional;
													}
													else{
														target = targetBranch;
													}
													var locationToUpdate = "/gitapi/config/" + "branch." + item.Name + ".remote"  + "/clone/file/" + parts[4];
													gitService.addCloneConfigurationProperty(locationToChange,"branch." + item.Name + ".remote" ,target.parent.Name).then(
														function(){
															handlePush(options, target.Location, "HEAD",target.Name, false);
														}, function(err){
															if(err.status == 409){ //when confing entry is already defined we have to edit it
																gitService.editCloneConfigurationProperty(locationToUpdate,target.parent.Name).then(
																	function(){
																		handlePush(options, target.Location, "HEAD",target.Name, false);
																	}
																);
															}
														}
													);
												}
											)
										});
										
										if (item.RemoteLocation.length === 1 && item.RemoteLocation[0].Children.length === 1) { //when we push next time - chance to switch saved remote
											var dialog2 = dialog;
											
											dialog = new orion.git.widgets.ConfirmPushDialog({
												title: messages["Choose Branch"],
												serviceRegistry: serviceRegistry,
												gitClient: gitService,
												dialog: dialog2,
												location: item.RemoteLocation[0].Children[0].Name,
												func: dojo.hitch(this, function(){handlePush(options,item.RemoteLocation[0].Children[0].Location, "HEAD", path, true);})
											});
										}
										
										dialog.startup();
										dialog.show();
									}
								);
						
							}
						);
					}
				);
			},
			visibleWhen : function(item) {
				if (item.toRef)
					// for action in the git log
					return item.RepositoryPath === "" && item.toRef.Type === "Branch" && item.toRef.Current && item.toRef.RemoteLocation; //$NON-NLS-0$
				else
					// for action in the repo view
					return item.Type === "Branch" && item.Current && item.RemoteLocation; //$NON-NLS-0$
				
			}
		});
		commandService.addCommand(pushCommand);

		var pushForceCommand = new mCommands.Command({
			name : messages["Force Push All"],
			tooltip: messages["Push commits and tags from your local branch into the remote branch overriding its current content"],
			imageClass: "git-sprite-push", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			id : "eclipse.orion.git.pushForce", //$NON-NLS-0$
			callback: function(data) {
				if(!confirm(messages["You're going to override content of the remote branch. This can cause the remote repository to lose commits."]+"\n\n"+messages['Are you sure?'])) //$NON-NLS-1$
					return;
				var target;
				var item = data.items;
				var path = dojo.hash();
				if (item.toRef) {
					item = item.toRef;
				}
				var commandInvocation = data;
				
				var parts = item.CloneLocation.split("/");
				
				var handleResponse = function(jsonData, commandInvocation){
					if (jsonData.JsonData.HostKey){
						commandInvocation.parameters = null;
					} else if (!commandInvocation.optionsRequested){
						if (jsonData.JsonData.User)
							commandInvocation.parameters = new mCommands.ParametersDescription([new mCommands.CommandParameter("sshpassword", "password", messages['SSH Password:'])], {hasOptionalParameters: true}); //$NON-NLS-1$ //$NON-NLS-0$
						else
							commandInvocation.parameters = new mCommands.ParametersDescription([new mCommands.CommandParameter("sshuser", "text", messages['SSH User Name:']), new mCommands.CommandParameter("sshpassword", "password", messages['SSH Password:'])], {hasOptionalParameters: true}); //$NON-NLS-4$ //$NON-NLS-3$ //$NON-NLS-1$ //$NON-NLS-0$
					}
					
					commandInvocation.errorData = jsonData.JsonData;
					commandService.collectParameters(commandInvocation);
				};
				
				if (commandInvocation.parameters && commandInvocation.parameters.optionsRequested){
					commandInvocation.parameters = null;
					commandInvocation.optionsRequested = true;
					commandService.collectParameters(commandInvocation);
					return;
				}
				var gitService = serviceRegistry.getService("orion.git.provider");
				
				var handlePush = function(options, location, ref, name, force){
					var progressService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
					progressService.createProgressMonitor(gitService.doPush(location, ref, true, force, //$NON-NLS-0$
							options.gitSshUsername, options.gitSshPassword, options.knownHosts,
							options.gitPrivateKey, options.gitPassphrase), messages['Pushing remote: '] + name).deferred.then(
						function(jsonData){
							exports.handleProgressServiceResponse2(jsonData, serviceRegistry, 
								function() {
									if (explorer.parentId === "explorer-tree") { //$NON-NLS-0$
										if (!jsonData || !jsonData.HttpCode)
											dojo.query(".treeTableRow").forEach(function(node, i) { //$NON-NLS-0$
											dojo.toggleClass(node, "outgoingCommitsdRow", false); //$NON-NLS-0$
										});
									} else {
										dojo.hitch(explorer, explorer.changedItem)();
									}
								}, function (jsonData) {
									handleResponse(jsonData, commandInvocation);
								}
							);
						}, function(jsonData, secondArg) {
							exports.handleProgressServiceResponse2(jsonData, serviceRegistry, 
								function() {
								
								}, function (jsonData) {
									handleResponse(jsonData, commandInvocation);
								}
							);
						}
					);
				};
										
				gitService.getGitClone(item.CloneLocation).then(
					function(clone){
						var remoteLocation = clone.Children[0].RemoteLocation;
						var locationToChange = clone.Children[0].ConfigLocation;
						
						exports.gatherSshCredentials(serviceRegistry, commandInvocation).then(
							function(options) {
								
								var result = new dojo.Deferred();
								
								if (item.RemoteLocation.length === 1 && item.RemoteLocation[0].Children.length === 1) { //when we push next time - chance to switch saved remote
									result = gitService.getGitRemote(remoteLocation);
								} else {
									var remotes = {};
									remotes.Children = item.RemoteLocation;
									result.resolve(remotes);
									
								}
						
								result.then(
									function(remotes){
										var dialog = new orion.git.widgets.RemotePrompterDialog({
											title: messages["Choose Branch"],
											serviceRegistry: serviceRegistry,
											gitClient: gitService,
											treeRoot: {
												Children: remotes.Children
											},
											hideNewBranch: false,
											func: dojo.hitch(this, 
												function(targetBranch, remote, optional) {
													if(targetBranch === null){
														target = optional;
													}
													else{
														target = targetBranch;
													}
													var locationToUpdate = "/gitapi/config/" + "branch." + item.Name + ".remote"  + "/clone/file/" + parts[4];
													gitService.addCloneConfigurationProperty(locationToChange,"branch." + item.Name + ".remote" ,target.parent.Name).then(
														function(){
															handlePush(options, target.Location, "HEAD",target.Name, true);
														}, function(err){
															if(err.status == 409){ //when confing entry is already defined we have to edit it
																gitService.editCloneConfigurationProperty(locationToUpdate,target.parent.Name).then(
																	function(){
																		handlePush(options, target.Location, "HEAD",target.Name, true);
																	}
																);
															}
														}
													);
												}
											)
										});
										
										if (item.RemoteLocation.length === 1 && item.RemoteLocation[0].Children.length === 1) { //when we push next time - chance to switch saved remote
											var dialog2 = dialog;
											
											dialog = new orion.git.widgets.ConfirmPushDialog({
												title: messages["Choose Branch"],
												serviceRegistry: serviceRegistry,
												gitClient: gitService,
												dialog: dialog2,
												location: item.RemoteLocation[0].Children[0].Name,
												func: dojo.hitch(this, function(){handlePush(options,item.RemoteLocation[0].Children[0].Location, "HEAD", path, true);})
											});
										}
										
										dialog.startup();
										dialog.show();
									}
								);
						
							}
						);
					}
				);			
			},
			visibleWhen : function(item) {
				if (item.toRef)
					// for action in the git log
					return item.RepositoryPath === "" && item.toRef.Type === "Branch" && item.toRef.Current && item.toRef.RemoteLocation; //$NON-NLS-0$		
			}
		});
		commandService.addCommand(pushForceCommand);

		var previousLogPage = new mCommands.Command({
			name : messages["< Previous Page"],
			tooltip: messages["Show previous page of git log"],
			id : "eclipse.orion.git.previousLogPage", //$NON-NLS-0$
			hrefCallback : function(data) {
				return require.toUrl("git/git-log.html") + "#" + data.items.PreviousLocation; //$NON-NLS-1$ //$NON-NLS-0$
			},
			visibleWhen : function(item) {
				if(item.Type === "RemoteTrackingBranch" || (item.toRef != null && item.toRef.Type === "Branch") || item.RepositoryPath != null){ //$NON-NLS-1$ //$NON-NLS-0$
					return item.PreviousLocation !== undefined;
				}
				return false;
			}
		});
		commandService.addCommand(previousLogPage);

		var nextLogPage = new mCommands.Command({
			name : messages["Next Page >"],
			tooltip: messages["Show next page of git log"],
			id : "eclipse.orion.git.nextLogPage", //$NON-NLS-0$
			hrefCallback : function(data) {
				return require.toUrl("git/git-log.html") + "#" + data.items.NextLocation; //$NON-NLS-1$ //$NON-NLS-0$
			},
			visibleWhen : function(item) {
				if(item.Type === "RemoteTrackingBranch" ||(item.toRef != null && item.toRef.Type === "Branch") || item.RepositoryPath != null){ //$NON-NLS-1$ //$NON-NLS-0$
					return item.NextLocation !== undefined;
				}
				return false;
			}
		});
		commandService.addCommand(nextLogPage);

		var resetIndexCommand = new mCommands.Command({
			name : messages['Reset'],
			tooltip: messages["Reset your active branch to the state of the selected branch. Discard all staged and unstaged changes."],
			id : "eclipse.orion.git.resetIndex", //$NON-NLS-0$
			imageClass: "git-sprite-reset", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				if(confirm(messages["The content of your active branch will be replaced with "] + item.Name + ". " + //$NON-NLS-1$
						messages["All unstaged and staged changes will be discarded and cannot be recovered. Are you sure?"])){
					var service = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
					var progressService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
					progressService.createProgressMonitor(service.resetIndex(item.IndexLocation, item.Name), messages["Resetting index..."]).deferred.then(
						function(result){
							var display = {};
							display.Severity = "Info"; //$NON-NLS-0$
							display.HTML = false;
							display.Message = "Ok"; //$NON-NLS-0$
							dojo.hitch(explorer, explorer.changedItem)(item);
							progressService.setProgressResult(display);
						}, function (error){
							var display = {};
							display.Severity = "Error"; //$NON-NLS-0$
							display.HTML = false;
							display.Message = error.message;
							progressService.setProgressResult(display);
						}
					);
				}
			},
			visibleWhen : function(item) {
				return item.Type === "RemoteTrackingBranch"; //$NON-NLS-0$
			}
		});
		commandService.addCommand(resetIndexCommand);

		var tagNameParameters = new mCommands.ParametersDescription([new mCommands.CommandParameter('name', 'text', messages['Name:'])]); //$NON-NLS-1$ //$NON-NLS-0$

		var addTagCommand = new mCommands.Command({
			name : messages["Tag"],
			tooltip: messages["Create a tag for the commit"],
			imageClass: "git-sprite-tag", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			id : "eclipse.orion.git.addTag", //$NON-NLS-0$
			parameters: tagNameParameters,
			callback: function(data) {
				var item = data.items;
				
				var createTagFunction = function(commitLocation, tagName) {						
					serviceRegistry.getService("orion.git.provider").doAddTag(commitLocation, tagName).then(function() { //$NON-NLS-0$
						dojo.hitch(explorer, explorer.changedItem)(item);
					}, displayErrorOnStatus);
				};
				
				var commitLocation = item.Location;
				
				if (data.parameters.valueFor("name") && !data.parameters.optionsRequested) { //$NON-NLS-0$
					createTagFunction(commitLocation, data.parameters.valueFor("name")); //$NON-NLS-0$
				} else {
					exports.getNewItemName(item, explorer, false, data.domNode.id, messages["Tag name"], function(name) {
						if (!name && name == "") {
							return;
						}		
						createTagFunction(commitLocation, name);
					});
				}
			},
			visibleWhen : function(item) {
				return item.Type === "Commit"; //$NON-NLS-0$
			}
		});
		commandService.addCommand(addTagCommand);

		var removeTagCommand = new mCommands.Command({
			name: messages['Delete'],
			tooltip: messages["Delete the tag from the repository"],
			imageClass: "core-sprite-delete", //$NON-NLS-0$
			id: "eclipse.removeTag", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				if (confirm(dojo.string.substitute(messages["Are you sure you want to delete tag ${0}?"], [item.Name]))) {
					serviceRegistry.getService("orion.git.provider").doRemoveTag(item.Location).then(function() { //$NON-NLS-0$
						dojo.hitch(explorer, explorer.changedItem)(item.parent);
					}, displayErrorOnStatus);
				}
			},
			visibleWhen: function(item) {
				return item.Type === "Tag"; //$NON-NLS-0$
			}
		});
		commandService.addCommand(removeTagCommand);

		var cherryPickCommand = new mCommands.Command({
			name : messages["Cherry-Pick"],
			tooltip: messages["Apply the change introduced by the commit to your active branch"],
			id : "eclipse.orion.git.cherryPick", //$NON-NLS-0$
			imageClass: "git-sprite-cherry_pick", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				var path = dojo.hash();
				var service = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
				var headLocation = item.Location.replace(item.Name, "HEAD"); //$NON-NLS-0$
				service.doCherryPick(headLocation, item.Name).then(function(jsonData) {
					var display = [];

					// TODO we should not craft locations in the
					// code
					var statusLocation = item.Location.replace("commit/" + item.Name, "status"); //$NON-NLS-1$ //$NON-NLS-0$

					if (jsonData.Result == "OK") { //$NON-NLS-0$
						// operation succeeded
						display.Severity = "Ok"; //$NON-NLS-0$
						if (jsonData.HeadUpdated) {
							display.HTML = false;
							display.Message = jsonData.Result;

							if (explorer.parentId === "explorer-tree") { //$NON-NLS-0$
								// refresh commit list
								service.doGitLog(path).then(function(jsonData) {
									if (jsonData.HeadLocation) {
										// log view for remote
										dojo.place(document.createTextNode(messages['Getting git incoming changes...']), "explorer-tree", "only"); //$NON-NLS-2$ //$NON-NLS-1$
										service.getLog(jsonData.HeadLocation, jsonData.Id).then(function(scopedCommitsJsonData, secondArg) {
												explorer.renderer.setIncomingCommits(scopedCommitsJsonData.Children);
												explorer.loadCommitsList(jsonData.CommitLocation + "?page=1", jsonData, true); //$NON-NLS-0$
										});
									} else {
										// log view for branch /
										// all branches
										dojo.place(document.createTextNode(messages['Getting git incoming changes...']), "explorer-tree", "only"); //$NON-NLS-2$ //$NON-NLS-1$
										service.getLog(path, "HEAD").then(function(scopedCommitsJsonData, secondArg) { //$NON-NLS-0$
												explorer.renderer.setOutgoingCommits(scopedCommitsJsonData.Children);
												explorer.loadCommitsList(path, jsonData, true);
										});
									}
								});
							}
						} else {
							display.HTML = true;
							display.Message = "<span>"+messages["Nothing changed."]+"</span>"; //$NON-NLS-2$ //$NON-NLS-0$
						}
					}
					// handle special cases
					else if (jsonData.Result == "CONFLICTING") { //$NON-NLS-0$
						display.Severity = "Warning"; //$NON-NLS-0$
						display.HTML = true;
						display.Message = "<span>" + jsonData.Result + messages[". Some conflicts occurred"] + //$NON-NLS-0$
						+ dojo.string.substitute(messages['. Go to ${0}.'], ["<a href=\"" + require.toUrl(mGitUtil.statusUILocation) + "#"  //$NON-NLS-2$ //$NON-NLS-1$
						+ statusLocation +"\">"+messages['Git Status page']+"</a>"])+".</span>"; //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
					} else if (jsonData.Result == "FAILED") { //$NON-NLS-0$
						display.Severity = "Error"; //$NON-NLS-0$
						display.HTML = true;
						display.Message = "<span>" + jsonData.Result  //$NON-NLS-0$
						+ dojo.string.substitute(messages['. Go to ${0}.'], ["<a href=\"" + require.toUrl(mGitUtil.statusUILocation) + "#"  //$NON-NLS-2$ //$NON-NLS-1$
						+ statusLocation +"\">"+messages['Git Status page']+"</a>"])+".</span>";					} //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-0$
					// handle other cases
					else {
						display.Severity = "Warning"; //$NON-NLS-0$
						display.HTML = false;
						display.Message = jsonData.Result;
					}
					serviceRegistry.getService("orion.page.message").setProgressResult(display); //$NON-NLS-0$
				}, displayErrorOnStatus);

			},
			visibleWhen : function(item) {
				return item.Type === "Commit"; //$NON-NLS-0$
			}
		});
		commandService.addCommand(cherryPickCommand);
	}