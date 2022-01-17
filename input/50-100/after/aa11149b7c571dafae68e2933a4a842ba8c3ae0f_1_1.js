function(e, data){
		if( $("#tpl-container").find("[class*='tpl-view'][nid='"+ data.nid +"']").size() === 0 ){
			_getDataAndCreateTplView(data.nid, function(view){
				_adjustPosition(view);
				view.find(".param_set").focus();
			});
		}
		
	}