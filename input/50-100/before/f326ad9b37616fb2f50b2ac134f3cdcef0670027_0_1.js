function enhancementInitDetails(type) {
	$('tr.parent.' + type + ' span.detailsLink').attr("title","Click for message details")
		.click(function(){
			var messageID = this.id.substring(this.id.indexOf('_') + 1);
			enhancementLoadDetails(messageID, type);
		});
}