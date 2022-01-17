function(){

		if($(this).attr('name')){

			if($("[name="+$(this).attr('name')+"]").length > 1){

				if(!json[$(this).attr('name')]) json[$(this).attr('name')] = new Array();	

				json[$(this).attr('name')].push($(this).val());

			}else if(($(this).children(':not(option)').length > 0)){

				json[$(this).attr('name')] = new Object();

				fetch(this,json[$(this).attr('name')]);

			}else{


				json[$(this).attr('name')] = $(this).val();


			}

		}			

	}