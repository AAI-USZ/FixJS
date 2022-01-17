function (data,callback) {
		
		if(data === null || data <= 0) {
			return null;
		}

		var url = this.wsURL + '/rest/api/products/' + data +'/reviews?callback=?';
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