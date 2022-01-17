function fetch(node,json){

	if($(node).children().length == 0){
	
		return $(node).val();
	
	}else{

		$(node).children().each(function(){
	
			if($(this).attr('name')){
	
				if($(node).children("[name="+$(this).attr('name')+"]").length > 1){
	
					if(!json[$(this).attr('name')]) json[$(this).attr('name')] = new Array();	
	
					newJSON = new Object();
					
					newJSON = fetch(this,newJSON);
	
					json[$(this).attr('name')].push(newJSON);
	
				}else if(($(this).children(':not(option)').length > 0)){
					
					json[$(this).attr('name')] = new Object();
	
					json = fetch(this,json[$(this).attr('name')]);
	
				}else{
		
					json[$(this).attr('name')] = $(this).val();	
	
				}
	
			}			
	
		});	
		
	}
	
	return json;

}