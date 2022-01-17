function initChildRows(type) {
	$('tr.parent.'+type)
		.css("cursor","pointer")
		.attr("title","Click to expand/collapse")
		.click(function(){
			$('#child-'+this.id).toggle();
	});
}