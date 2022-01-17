function(data, callback){
						$.ajax({
							type : "DELETE",
							url : _.str.sprintf("/%s/tpl/%s/paramset/%s", userid, data.nid, data.paramsetid),
							async: false,
							contentType : "application/json; charset=utf-8",
							success : function(){
								console.log("request end.");
								callback();
							},
							error : function(xhr){
								console.log("http request failure.");
							}
						});
					}