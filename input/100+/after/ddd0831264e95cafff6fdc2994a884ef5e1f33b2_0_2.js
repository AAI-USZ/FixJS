function (callback) {
			           
		var url = this.wsURL + '/rest/api/categories?callback=?';
		//var url ='http://172.16.25.125:8880/eshop/rest/api/categories';
		//alert('url  = ' + url);
		//jQuery.support.cors = true;

		$.ajax({
			url: url,
			header:"Access-Control-Allow-Headers: x-requested-with",
			type: "GET",
			dataType: "json",
			crossDomain: true,
			cache: true,
			success : function(jo, e, xhr) {
				if(callback !== null) {
					callback(jo);
				}
			},
			error : function(xhr, e, et){
				var jo = {"status":"server error"};
				if(callback !== null) {
					callback(jo);
				}
			}
		});
    }