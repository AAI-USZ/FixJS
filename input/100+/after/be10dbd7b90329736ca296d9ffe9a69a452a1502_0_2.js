function(data) {
			var response = data.responseJSON;
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
					if($$('ul.messages').size())
					{
						$('react_dialogbox').insert({'top': $$('ul.messages')[0]});
					}
				}
				else {
					self.clearSession();	
				}
			}