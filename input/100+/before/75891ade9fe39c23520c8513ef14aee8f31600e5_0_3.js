function getSQLParams(){

	json['count'] = new Array();
		
	json['value'] = new Array();
	
	json['key'] = $("[data-base=primary]").val();

	$("[data-base]").each(function(){
		
		if($(this).attr('data-base') == 'value'){
		
			json['value'].push($(this).attr('name')+":"+$(this).val());
		
		}else if($(this).attr('data-base') == 'count'){
		
			count = $("[name=" + $(this).attr('name') + "]").length;
			
			json['count'].push($(this).attr('name')+":"+count);
		
		}
	
	});
	
	return json;

}