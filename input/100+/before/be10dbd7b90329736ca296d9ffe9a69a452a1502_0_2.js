function(data) {
			var response = data.responseJSON;
				console.log(response);
				if(response.url) {
					if(typeof(response.url) == 'boolean'){
						window.location.reload();
					}
					else {
						window.location.href = response.url;	
					}
				}
				else if (response.html){
					self.initBox(response.html);	
				}
				else {
					self.clearSession();	
				}
			}