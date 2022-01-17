function() {

    if(!this.children().length) return this.val();

	var json = new Object();

	this.children('[name]').each(function(){

		name = $(this).attr('name');

		if($(this).siblings("[name="+name+"]").length){

			if(!json[name]) json[name] = [];

			json[name].push($(this).toJSON());

		}else if($(this).children('[name]').length){

			json[name] = $(this).toJSON();

		}else{

			json[name] = $(this).val();	

		}			

	});	

	return json;

  }