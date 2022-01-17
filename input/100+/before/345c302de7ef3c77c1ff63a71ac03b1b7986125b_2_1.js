function(serviceRegistry, commandService, refreshStatusCallBack, cmdBaseNumber, navigator) {
		
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
		
		var fetchCommand = new mCommands.Command({
			name : messages['Fetch'],
			tooltip : messages["Fetch from the remote branch into your remote tracking branch"],
			imageClass: "git-sprite-fetch", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			id : "eclipse.orion.git.fetch", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				var path = item.Location;
				var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
				exports.getDefaultSshOptions(serviceRegistry).then(function(options) {
					var func = arguments.callee;
					var statusService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
						statusService.createProgressMonitor(gitService.doFetch(path, false,
							options.gitSshUsername,
							options.gitSshPassword,
							options.knownHosts,
							options.gitPrivateKey,
							options.gitPassphrase), messages['Fetching remote: '] + path).deferred.then(function(jsonData, secondArg) {
						exports.handleProgressServiceResponse(jsonData, options, serviceRegistry, function(jsonData) {
							gitService.getGitRemote(path).then(function(remoteJsonData) {
									if(navigator._gitCommitNavigatorRem.parentId)
										dojo.place(document.createTextNode("Getting git incoming changes..."), navigator._gitCommitNavigatorRem.parentId, "only"); //$NON-NLS-1$ //$NON-NLS-0$
									gitService.getLog(remoteJsonData.HeadLocation, remoteJsonData.Id).then(function(scopedCommitsJsonData) {
											navigator._gitCommitNavigatorRem.renderer.setIncomingCommits(scopedCommitsJsonData.Children);
											navigator._gitCommitNavigatorRem.loadCommitsList(remoteJsonData.CommitLocation + "?page=1&pageSize=5", remoteJsonData, true); //$NON-NLS-0$
									});
							});
						}, func, messages["Fetch Git Repository"]);
					}, function(jsonData, secondArg) {
						exports.handleProgressServiceResponse(jsonData, options, serviceRegistry, function() {}, func, messages['Fetch Git Repository']);
					});
				});
			},
			visibleWhen : function(item) {
				return item.Type === "RemoteTrackingBranch"; //$NON-NLS-0$
			}
		});
		commandService.addCommand(fetchCommand);
		commandService.registerCommandContribution("itemLevelCommands", "eclipse.orion.git.fetch", cmdBaseNumber+1);	 //$NON-NLS-1$ //$NON-NLS-0$

		var mergeCommand = new mCommands.Command({
			name : messages['Merge'],
			tooltip: messages['Merge the content from the branch to your active branch'],
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

							refreshStatusCallBack();
							progressService.setProgressResult(display);
						} else if (result.jsonData){
							display.Severity = "Warning"; //$NON-NLS-0$
							display.HTML = true;
							display.Message = "<span>" + result.jsonData.Result+"<span>"; //$NON-NLS-1$ //$NON-NLS-0$

							progressService.setProgressResult(display);
						} else if (result.error) {
							display.Severity = "Error"; //$NON-NLS-0$
							if(result.error.responseText && JSON.parse(result.error.responseText)){
								var resp = JSON.parse(result.error.responseText);
								display.Message = resp.DetailedMessage ? resp.DetailedMessage : resp.Message;
							}else{
								display.Message = result.error.message;
							}
							display.HTML = true;
							display.Message ="<span>" + display.Message + "<span>"; //$NON-NLS-1$ //$NON-NLS-0$
							
							progressService.setProgressResult(display);
						}
					}, function (error, ioArgs) {
						var display = [];
						
						display.Severity = "Error"; //$NON-NLS-0$
						display.HTML = true;
						display.Message = "<span>" + dojo.fromJson(ioArgs.xhr.responseText).DetailedMessage +"</span>"; //$NON-NLS-1$ //$NON-NLS-0$
						
						progressService.setProgressResult(display);
					});
			},
			visibleWhen : function(item) {
				return item.Type === "RemoteTrackingBranch" || (item.Type === "Branch" && !item.Current); //$NON-NLS-1$ //$NON-NLS-0$
			}
		});
		commandService.addCommand(mergeCommand);
		commandService.registerCommandContribution("itemLevelCommands", "eclipse.orion.git.merge", cmdBaseNumber+2);	 //$NON-NLS-1$ //$NON-NLS-0$

		var pushCommand = new mCommands.Command({
			name : messages["Push"],
			tooltip: messages["Push from your local branch into the remote branch"],
			imageClass: "git-sprite-push", //$NON-NLS-0$
			spriteClass: "gitCommandSprite", //$NON-NLS-0$
			id : "eclipse.orion.git.push", //$NON-NLS-0$
			callback: function(data) {
				var item = data.items;
				var path = dojo.hash();
				var gitService = serviceRegistry.getService("orion.git.provider"); //$NON-NLS-0$
				if(item.RemoteLocation.length==1 && item.RemoteLocation[0].Children.length==1){
					exports.getDefaultSshOptions(serviceRegistry).then(function(options){
						var func = arguments.callee;
						var progressService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
						progressService.createProgressMonitor(gitService.doPush(item.RemoteLocation[0].Children[0].Location, "HEAD", true, false, //$NON-NLS-0$
								options.gitSshUsername, options.gitSshPassword, options.knownHosts,
								options.gitPrivateKey, options.gitPassphrase), messages['Pushing remote: '] + path).deferred.then(function(remoteJsonData){
							exports.handleProgressServiceResponse(remoteJsonData, options, serviceRegistry,
								function(jsonData){
									if (!jsonData || !jsonData.HttpCode){
										dojo.query(".treeTableRow").forEach(function(node, i) { //$NON-NLS-0$
											dojo.toggleClass(node, "outgoingCommitsdRow", false); //$NON-NLS-0$
										});
										refreshStatusCallBack();
									}
								}, func, "Push Git Repository"); //$NON-NLS-0$
						}, function(jsonData, secondArg) {
							exports.handleProgressServiceResponse(jsonData, options, serviceRegistry, function() {}, func, messages["Push Git Repository"]);
						});
					});
				} else {
					var remotes = item.RemoteLocation;
					var dialog = new orion.git.widgets.RemotePrompterDialog({
						title: messages['Choose Branch'],
						serviceRegistry: serviceRegistry,
						gitClient: gitService,
						treeRoot: {Children: remotes},
						hideNewBranch: true,
						func: dojo.hitch(this, function(targetBranch, remote) {
							exports.getDefaultSshOptions(serviceRegistry).then(function(options){
								var func = arguments.callee;
								var progressService = serviceRegistry.getService("orion.page.message"); //$NON-NLS-0$
								progressService.createProgressMonitor(gitService.doPush(targetBranch.Location, "HEAD", true, false, //$NON-NLS-0$
										options.gitSshUsername, options.gitSshPassword, options.knownHosts,
										options.gitPrivateKey, options.gitPassphrase), messages['Pushing remote: '] + remote).deferred.then(function(remoteJsonData){
								exports.handleProgressServiceResponse(remoteJsonData, options, serviceRegistry,
									function(jsonData){
										if (!jsonData || !jsonData.HttpCode){
											dojo.query(".treeTableRow").forEach(function(node, i) { //$NON-NLS-0$
												dojo.toggleClass(node, "outgoingCommitsdRow", false); //$NON-NLS-0$
											});
											refreshStatusCallBack();
										}
									}, func, messages['Push Git Repository']);
								});
							}, function(jsonData, secondArg) {
								exports.handleProgressServiceResponse(jsonData, options, serviceRegistry, function() {}, func, messages['Pushing remote: '] + remote);
							});
						})
					});
					dialog.startup();
					dialog.show();
				}
			},
			visibleWhen : function(item) {
				return item.Type === "LocalBranch" ; //$NON-NLS-0$
			}
		});
		commandService.addCommand(pushCommand);
		commandService.registerCommandContribution("itemLevelCommands", "eclipse.orion.git.push", cmdBaseNumber+3); //$NON-NLS-1$ //$NON-NLS-0$
	}