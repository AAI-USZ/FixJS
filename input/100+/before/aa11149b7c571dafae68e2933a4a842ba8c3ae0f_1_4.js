function(){

	var userid = qtpl.userid;
	
	var treecontainer  = $("#tree-container").treewrapper({
		initialJsonDataUrl : _.str.sprintf("/%s/tree", userid)
	});
	
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

	treecontainer.on("select_file.treewrapper", function(e, data){
		if( $("#tpl-container").find(".tpl-view", "[nid="+ data.nid +"]").size() === 0 ){
			_getDataAndCreateTplView(data.nid);
		}
		
	})
	.on("file_created.treewrapper", function(e, data){
		var nid = $(data).attr("nid");
		createTplEdit({nid: nid, title: data.newname}, function(edit){
			console.log("edit.save");
			edit.save();
		});
		
	})
	.on("file_removed.treewrapper", function(e, data){
		var nid = data.nid;
		$.ajax({
			type : "DELETE",
			url : _.str.sprintf("/%s/tpl/%s", userid, nid),
			async: false,
			contentType : "application/json; charset=utf-8",
			success : function(){},
			error : function(xhr){
				console.log("http request failure.");
			}
		});
		$("#tpl-container").find(_.str.sprintf("[nid='%s']", nid)).remove();
		
	})
	.on("node_changed.treewrapper", function(e, data){
		var jsonstring = JSON.stringify(treecontainer.treewrapper("getjson"));
		$.ajax({
			type : "PUT",
			url:  _.str.sprintf("/%s/tree", userid),
			async: true,
			contentType : "application/json; charset=utf-8",
			data : jsonstring,
			success : function(){console.log("tree is updated.")},
			error : function(xhr){
				console.log("http request failure.");
			}
		});
		
	});
	
	_initParamsetNameDialog("create");
	_initParamsetNameDialog("rename");
	
	function _initParamsetNameDialog(type){
		var map = { 
			"create": {
				dialogid: "#paramset_setname", textid: "#dialog_paramset_name",
				buttonName: "登録", funcName: "saveParamset"
			}, 
			"rename": {
				dialogid: "#paramset_rename", textid: "#dialog_paramset_rename",
				buttonName: "更新", funcName: "renameParamset"
			}
		};
		var dialogid = map[type].dialogid;
		var textid = map[type].textid;
		var buttonName = map[type].buttonName;
		var funcname = map[type].funcName;
		
		var buttons = {};
		buttons['キャンセル'] = function(){
        	$(this).find(textid).val("");
        	$(this).dialog('close');
		}
		buttons[buttonName] = function(){
        	var paramsetName = $(this).find(textid).val().trim();
        	if( paramsetName === "" ){
        		return;
        	}
        	var option = $(this).dialog('option');
        	var nid = option.nid;
        	var tplview = option.tplview;
        	tplview.tplview(funcname, paramsetName);

        	$(this).find(textid).val("");
            $(this).dialog('close');
		}
		
	    jQuery(dialogid).dialog( {
	        autoOpen: false,
	        width: 270,
	        show: 'fade',
	        hide: 'fade',
	        modal: true,
	        buttons: buttons
	    } );		

	}

	
	function _createTplView(option){
				
		var newview = $("#tpl-view").tmpl(["test"]);
		newview.css({top: 0, left: 0, position: "absolute"});
		newview.tplview($.extend(option, {
					renameParamset: function(data, callback){
						console.log("renameParamset", data.paramsetName);
						$.ajax({
							type : "POST",
							url : _.str.sprintf("/%s/tpl/%s/paramset/%s/rename", userid, data.nid, data.paramsetid),
							async: true,
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
					},
					
					removeParamset: function(data, callback){
						$.ajax({
							type : "DELETE",
							url : _.str.sprintf("/%s/tpl/%s/paramset/%s", userid, data.nid, data.paramsetid),
							async: true,
							contentType : "application/json; charset=utf-8",
							success : function(){
								console.log("request end.");
								callback();
							},
							error : function(xhr){
								console.log("http request failure.");
							}
						});
					},
			
					saveParamset: function(data){
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
				})
			)
			.on("paramset_save.tplview", function(e, data){
				if(data.selectedId === "-1"){
				    jQuery('#paramset_setname').dialog('option', "tplview", newview);
				    jQuery('#paramset_setname').dialog('open');
				}else{
					newview.tplview("saveParamset");
				}
			})
			.on("paramset_rename.tplview", function(e, currentName){
			    $('#paramset_rename').dialog('option', "tplview", newview);
			    $('#dialog_paramset_rename').val(currentName);
			    $('#paramset_rename').dialog('open');
			    $('#dialog_paramset_rename').select();
			})			
			.on("gotoedit.tplview", function(e, layout){
				
				//data get
				$.ajax({
					type : "GET",
					url:  _.str.sprintf("/%s/tpl/%s", userid, option.nid),
					async: true,
					contentType : "application/json; charset=utf-8",
					success : function(data, dataType){
						if(!data){ console.error("error."); return; }
						createTplEdit($.extend( data, layout ));
						newview.remove();
					},
					error : function(xhr){
						console.log("http request failure.");
					}
				});
			});
		$("#tpl-container").append(newview);
		$("#tpl-container").draggableWrapper();
		return newview;
	}

	//new
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

	
	function _onsavedInTplEdit(e, data){
		console.log("_onsavedInTplEdit");
		treecontainer.treewrapper("renameNode", nid, data.title);
		_createTplView(data);
		
	}	

	
}