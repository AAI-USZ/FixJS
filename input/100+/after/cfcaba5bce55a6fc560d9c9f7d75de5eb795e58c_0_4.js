function(e){
					var id = $('.cms-edit-form :input[name=ID]').val();
					// TODO Trigger by implementing and inspecting "changed records" metadata 
					// sent by form submission response (as HTTP response headers)
					this.updateNodesFromServer([id]);
				}