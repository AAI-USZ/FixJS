function(e, data){
		if( $("#tpl-container").find(".tpl-view", "[nid="+ data.nid +"]").size() === 0 ){
			_getDataAndCreateTplView(data.nid);
		}
		
	}