function(params, page, success, error){
			var headers = {};
			if('eTag' in params) 
				headers = {"If-Match": params.eTag};
			
			if ('id' in params) {
				$.ajax({
					url: '/system/weblounge/pages/' + params.id,
					async: false,
					type: 'put',
					success: success,
					headers: headers,
					dataType: 'xml',
					data: {content : Page.parseJSON(page)}
				});
			}	
		}