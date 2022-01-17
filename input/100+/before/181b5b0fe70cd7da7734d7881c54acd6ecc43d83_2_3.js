function(data){
						console.log("saveParamset.")

						var onsuccess = function(){
							console.log("request end.")
						};
						if(data.paramset.id){
							console.log("put paramset data.");
							$.ajax({
								type : "PUT",
								url : _.str.sprintf("/%s/tpl/%s/paramset/%s", userid, data.nid, data.paramset.id),
								async: true,
								contentType : "application/json; charset=utf-8",
								data : JSON.stringify(data.paramset),
								success : onsuccess,
								error : function(xhr){
									console.log("http request failure.");
								}
							});
						}else{
							console.log("post paramset data.");
							$.ajax({
								type : "POST",
								url : _.str.sprintf("/%s/tpl/%s/paramset", userid, data.nid),
								async: true,
								contentType : "application/json; charset=utf-8",
								data : JSON.stringify(data.paramset),
								success : function(res){
									newview.tplview("addParamset", res.paramsetid, data.paramset.name);
								},
								error : function(xhr){
									console.log("http request failure.");
								}
							});
						}
					}