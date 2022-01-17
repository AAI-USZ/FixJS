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