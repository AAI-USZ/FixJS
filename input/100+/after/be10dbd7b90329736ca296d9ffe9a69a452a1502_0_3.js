function(url, params){
		var self = this;
		var ajax_params = {}
		if(typeof(parmas) !== undefined)
		{
			ajax_params = params; 
		}
		if(url[url.length-1] != '/')
		{
			url = url+'/';
		}
		this.showLoader();
		new Ajax.Request(url+this.modeVar+'/1', {
			parameters: ajax_params,
			onSuccess: function(data) {
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
		});
	}