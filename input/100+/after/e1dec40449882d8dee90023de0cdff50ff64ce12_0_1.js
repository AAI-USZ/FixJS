function(repositoryLocation, itemName, name){
					serviceRegistry.getService("orion.page.message").createProgressMonitor(serviceRegistry.getService("orion.git.provider").checkoutTag(repositoryLocation, itemName, name), //$NON-NLS-0$
							dojo.string.substitute(messages["Checking out tag ${0}"], [name])).deferred.then(function() {
						dojo.hitch(explorer, explorer.changedItem)(getBranchItem());
					}, displayErrorOnStatus);
				}