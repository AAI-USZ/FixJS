function ingestInitDetails(type) {
	$('tr.parent.'+type)
		.css("cursor","pointer")
		.attr("title","Click to expand/collapse")
		.click(function(){
			var target = $('#child-'+this.id);
			var id = this.id.substring(1);
			target.toggle();
			// Toggle display of the details and store this state
			if (target.is(":visible")){
				selectedIDs.push(id);
			} else {
				selectedIDs.splice($.inArray(id, selectedIDs), 1);
			}
	});
}