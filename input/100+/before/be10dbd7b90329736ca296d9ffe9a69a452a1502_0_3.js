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
		console.log(ajax_params);
		this.showLoader();
		new Ajax.Request(url+this.modeVar+'/1', {
			parameters: ajax_params,
			onSuccess: function(data) {
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
		});
	}