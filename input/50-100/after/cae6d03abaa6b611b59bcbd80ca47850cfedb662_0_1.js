function(resp, entryInfo, deleteLink, eText) { 
						if(!resp) {
							alert('Berta says, there was a server error while deleting this entry! Something has gone sooooo wrong...');
						
						} else if(resp && !resp.error_message) {
							this.unlinearProcess_stop(deleteProcessId);
							entryObj.destroy();
						} else {
							alert(resp.error_message);
							btn.setProperty('display', 'inline');
							entryObj.removeClass('xSavingAtLarge');
						}
					}