function (userid) {
		var api = this, orderhistory,
        url = this.wsURL + '/rest/api/products/orderhistory/' + userid;
		$.ajax({
			url: url,
			//data: {'param1':param1},
			header:"Access-Control-Allow-Headers: x-requested-with",
			type: "GET",
			dataType: "json",
			crossDomain: true,
			cache: true,
			async: false,
			success : function(orderResponse) {
				api.orderhistory = orderResponse;
				/*if(callback != null) {
					callback(jo);
				}*/
			},
			error : function(xhr, e, et){
				var jo = {"status":"server error"};
				/*if(callback != null) {
					callback(jo);
				}*/
			}
		});           
    }