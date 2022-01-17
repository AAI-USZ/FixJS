function(data, callback){
						console.log("renameParamset", data.paramsetName);
						$.ajax({
							type : "POST",
							url : _.str.sprintf("/%s/tpl/%s/paramset/%s/rename", userid, data.nid, data.paramsetid),
							async: false,
							contentType : "application/json; charset=utf-8",
							data : JSON.stringify({paramsetName: data.paramsetName}),
							success : function(){
								console.log("request end.");
								callback();
							},
							error : function(xhr){
								console.log("http request failure.");
							}
						});
					}