function updateIndexes(manifest){
	var input = manifest.obj ? $('#mediaDiv table tbody input') : $('#contentTable tbody input');
	input.each(function(i){
		$(this).val(i+1);
	});
}