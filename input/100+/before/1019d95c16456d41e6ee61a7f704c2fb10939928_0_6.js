function(clone){
						var remoteLocation = clone.Children[0].RemoteLocation; 
						var locationToChange = clone.Children[0].ConfigLocation;
						exports.gatherSshCredentials(serviceRegistry, commandInvocation).then(
							function(options) {
								if (item.RemoteLocation.length == 1 && item.RemoteLocation[0].Children.length == 1) { //when we push next time - chance to switch saved remote
								gitService.getGitRemote(remoteLocation).then(
									function(resp){
										var remotes = resp.Children;
										var dialog = new orion.git.widgets.RemotePrompterDialog({
											title: messages["Choose Branch"],
											serviceRegistry: serviceRegistry,
											gitClient: gitService,
											treeRoot: {
												Children: remotes
											},
											hideNewBranch: false,
											func: dojo.hitch(this, 
												function(targetBranch, remote, optional) {//third argument occurs when remote name is typed, not selected from the list
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
													},
													function(err){	
														if(err.status == 409){ //when confing entry is already defined we have to edit it
															gitService.editCloneConfigurationProperty(locationToUpdate,target.parent.Name).then(
																function(){
																	handlePush(options, target.Location, "HEAD",target.Name, false);
																},
																function(error){
																	}
																);
															}
														}
													);
												}
											)
										});
								var dialog2 = new orion.git.widgets.ConfirmPushDialog({
									title: messages["Choose Branch"],
									serviceRegistry: serviceRegistry,
									gitClient: gitService,
									dialog: dialog,
									location: item.RemoteLocation[0].Children[0].Name,
									func: dojo.hitch(this, function(){handlePush(options,item.RemoteLocation[0].Children[0].Location, "HEAD", path, true);})
									});
								dialog2.startup();
								dialog2.show();
								},
								function(err){
								}
							);
						}	
						 else { //pushing first time - branch tracs no remote yet
							var remotes = item.RemoteLocation;
							var dialog = new orion.git.widgets.RemotePrompterDialog({
								title: messages["Choose Branch"],
								serviceRegistry: serviceRegistry,
								gitClient: gitService,
								treeRoot: {
									Children: remotes
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
										},
											function(err){
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
								dialog.startup();
								dialog.show();	
								}
							}
						);					
					}