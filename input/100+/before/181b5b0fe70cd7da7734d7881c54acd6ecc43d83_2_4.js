function createTplEdit(data, procAfterCreated){
		var edit = $("#tpl-edit").tmpl([" "]);
		$("#tpl-container").append(edit);
		edit.css("position", "absolute");
		edit.tpledit(
				$.extend(data, 
					{
						onsave: function(data){
							console.log("put tpl data.");
							$.ajax({
								type : "PUT",
								url : _.str.sprintf("/%s/tpl/%s", userid, data.nid),
								async: true,
								contentType : "application/json; charset=utf-8",
								data : JSON.stringify(data),
								success : function(){console.log("put request end.");},
								error : function(xhr){
									console.log("http request failure.");
								}
							});
						},
						
						oncancel: function(data){
							
						}
					}
				)
			);
		
		if(procAfterCreated){
			console.log("propAfterCreated.");
			procAfterCreated(edit);
		}
		
		edit.on("onsaved.tpledit", function(e, data){
			treecontainer.treewrapper("renameNode", data.nid, data.title);
			_getDataAndCreateTplView(data.nid);
			edit.tpledit("removeTplEdit");
		});
		
		edit.on("oncancel.tpledit", function(e, data){
			_getDataAndCreateTplView(data.nid);
			edit.tpledit("removeTplEdit");
		});
		
		
		$("#tpl-container").draggableWrapper();
		edit.find(".text").focus();

	}