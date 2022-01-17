function (categoryId, callback) {
		
		var url = this.wsURL + '/rest/api/categories/' + categoryId;

		if(categoryId === 'All Products'){
			url = this.wsURL + '/rest/api/products';
		} else if(categoryId === 'Special Products') {
			url = this.wsURL + '/rest/api/specialproducts';
        }

		$.ajax({
			url: url,
			header:"Access-Control-Allow-Headers: x-requested-with",
			type: "GET",
			dataType: "json",
			crossDomain: true,
			cache: true,
			async: false,
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