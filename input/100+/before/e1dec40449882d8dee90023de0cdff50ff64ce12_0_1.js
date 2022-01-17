function(name){ //$NON-NLS-0$
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
				}