function(){
		if($.webshims.modules){
			getGroupElements = $.webshims.modules["form-core"].getGroupElements || getGroupElements;
		}
	}