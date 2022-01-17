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