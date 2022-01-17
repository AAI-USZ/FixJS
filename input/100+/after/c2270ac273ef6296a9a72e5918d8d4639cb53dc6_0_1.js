function enhancementInitDetails(type) {
	if (type == 'failed'){
		$('tr.parent.' + type + ' span.failedMessage')
			.css("cursor","pointer")
			.attr("title","Click for message details")
			.click(function(){
				var messageID = this.id.substring(this.id.indexOf('_') + 1);
				$.get(restUrl + "enhancement/" + type + "/job/" + messageID, function(data){
					$("#enhancementDetails").html(data.stackTrace);
				});
		});
	} else {
		$('tr.parent.'+type)
			.css("cursor","pointer")
			.attr("title","Click to expand/collapse")
			.click(function(){
				$.get(restUrl + "enhancement/" + type + "/job/" + this.id.substring(1), function(data){
					$("#enhancementDetails").html(data);
				});
		});
	}
	
}