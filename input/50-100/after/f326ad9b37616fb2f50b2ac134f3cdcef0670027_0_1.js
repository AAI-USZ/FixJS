function enhancementInitDetails(type) {
	$('tr.parent.' + type).attr("title","Click for message details")
		.click(function(){
			var messageID = this.id.substring(1);
			enhancementLoadDetails(messageID, type);
		});
}