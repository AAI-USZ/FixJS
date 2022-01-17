function _getDataAndCreateTplView(nid){
		$.ajax({
			type : "GET",
			url:  _.str.sprintf("/%s/tpl/%s", userid, nid),
			async: true,
			contentType : "application/json; charset=utf-8",
			success : function(data, dataType){
				if(!data){ console.error("error."); return; }
				_createTplView(data);
			},
			error : function(xhr){
				console.log("http request failure.");
			}
		});
	}