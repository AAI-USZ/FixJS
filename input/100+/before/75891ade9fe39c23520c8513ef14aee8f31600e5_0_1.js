function(){

		if($(this).siblings("[name="+$(this).attr('name')+"]").length){

			if(!json[$(this).attr('name')]) json[$(this).attr('name')] = [];

			json[$(this).attr('name')].push($(this).toJSON());

		}else if($(this).children('[name]').length){

			json[$(this).attr('name')] = $(this).toJSON();

		}else{

			json[$(this).attr('name')] = $(this).val();	

		}			

	}