function scripts_as_object(){
	var blocks = $('.workspace:visible .scripts_workspace > .wrapper');
	if (blocks.length){
		return blocks.map(function(){return $(this).block_description();}).get();
	}
	else{
		return [];
	}   
}