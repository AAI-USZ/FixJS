function(resp, entryInfo, deleteLink, eText) { 
					if(!resp) {
						alert('Berta says, there was a server error while deleting this entry! Something has gone sooooo wrong...');
					
					} else if(resp && !resp.error_message) {
						this.unlinearProcess_stop(processId);
						value == 'yes' ? el.set('checked', true) : el.set('checked', false);
						elParent.removeClass('xSavingAtLarge');
					} else {
						alert(resp.error_message);
						elParent.removeClass('xSavingAtLarge');
					}
				}