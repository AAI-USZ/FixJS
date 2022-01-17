function updateIndexes(quiz){
	var input = quiz ? $('#mediaDiv table tbody input') : $('#contentTable tbody input');
	input.each(function(i){
		$(this).val(i+1);
	});
}