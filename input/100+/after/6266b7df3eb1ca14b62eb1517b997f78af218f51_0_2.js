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
			console.log("textid:", textid);
        	var paramsetName = $(textid).val().trim();
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
	    
		$(textid).keypress(function(event){
			if( event.which === 13 ){
		    	//Enter Key
				$($(dialogid).siblings().find("button")[1]).trigger("click");
			}
		});

	}