function() {
	var default_categories = ['aww','earthporn','HumanPorn'];
	$.each(default_categories, function(index,category){
		addSubreddit(category);
		updateImageDictionary(category);
	});
}