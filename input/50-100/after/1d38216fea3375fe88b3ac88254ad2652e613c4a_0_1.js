function() {
	var default_categories = ['aww','earthporn','HumanPorn'];
	$.each(default_categories, function(index,category){
		addSubreddit(category);
		updateImageDictionary(category);
	});

	$('#image-container').css('min-width',($(window).width()-40)+'px');
}