function(resp) { 
					if(!resp) {
						alert('An error occured while toggling the tutorial video window state. Something has gone wrong!');
					} else if(resp && !resp.error_message) {
						this.unlinearProcess_stop(processId);
						value == 'yes' ? el.set('checked', true) : el.set('checked', false);
						elParent.removeClass('xSavingAtLarge');
					} else {
						alert(resp.error_message);
						elParent.removeClass('xSavingAtLarge');
					}
				}