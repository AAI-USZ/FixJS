function(){

		var pre_id = _.uniqueId("preview");

		var $pre = $("<pre>").attr("id",pre_id).text("Loading...");

		this.getResponseContent(function(data){

			$("#"+pre_id).text("Content: \n"+data);

		});

		return $('<div>').append($pre).html();

	}