function(data){
							console.log("put tpl data.", data);
							$.ajax({
								type : "PUT",
								url : _.str.sprintf("/%s/tpl/%s", userid, data.nid),
								async: false,
								contentType : "application/json; charset=utf-8",
								data : JSON.stringify(data),
								success : function(){console.log("put request end.");},
								error : function(xhr){
									console.log("http request failure.");
								}
							});
						}