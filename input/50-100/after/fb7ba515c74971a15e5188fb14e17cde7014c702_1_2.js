function (data) {
          
        var api = this,
        url = this.wsURL + '/rest/api/post/login?callback=?';
		$.ajax({
			url: url,
			data: data,
			header:"Access-Control-Allow-Headers: x-requested-with",
			type: "POST",
			dataType: "json",
			crossDomain: true,
			cache: true,
			async: false,
			success : function(response) {
				api.loginresponse = response;
			},
			error : function(xhr, e, et){
				var jo = {"status":"server error"};
			}
		});
    }