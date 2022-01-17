function(data){
		if (data == null || data.type == null) {
			$(".detailsContent").removeClass("active").removeClass("finished").removeClass("failed");
			$("#enhancementDetails").html("");
			$(".refreshDetailsButton").data("messageID");
			$(".refreshDetailsButton").data("type");
		} else if (data.type == 'failed') {
			var details = "<span>Status:</span>" + data.type + " (last refreshed " + new Date().toTimeString() + ")<br/>";
			details += "<span>Message:</span>" + data.id + "<br/>";
			details += "<span>Target:</span>" + data.targetPID + "<br/>"; 
			details += "<span>Queued Timestamp:</span>" + dateFormat(data.queuedTimestamp, true) + "<br/>";
			details += "<span>Action:</span><br/>" + data.action + "<br/>";
			details += "<span>Failed service:</span><br/>" + data.serviceName + "<br/>";
			if (data.stackTrace) {
				details += "<span>Stack trace:</span><br/>";
				details += "<pre>" + data.stackTrace + "</pre>";
			}
			$(".detailsContent").removeClass("active").removeClass("finished");
			$(".detailsContent").addClass("failed");
			$("#enhancementDetails").html(details);
			$(".refreshDetailsButton").data("messageID", messageID);
			$(".refreshDetailsButton").data("type", data.type);
		} else if (data.type == 'queued'){
			var details = "<span>Status:</span>" + data.type + " (last refreshed " + new Date().toTimeString() + ")<br/>";
			details += "<span>Message:</span>" + data.id + "<br/>";
			details += "<span>Target:</span>" + data.targetPID + "<br/>";
			details += "<span>Queued Timestamp:</span>" + dateFormat(data.queuedTimestamp, true) + "<br/>";
			details += "<span>Action:</span>" + data.action + "<br/>";
			if ("xml" in data.uris) {
				$.get(servicesUrl + data.uris.xml, function(data){
					var xmlstr = data.xml ? data.xml : (new XMLSerializer()).serializeToString(data);
					var xmlElement = $("<pre class='xmlBody'></pre>").text(xmlstr);
					$("#enhancementDetails").append("<span>Message Body:</span><br/>")
						.append(xmlElement);
				});
			}
			$(".detailsContent").removeClass("active").removeClass("finished").removeClass("failed");
			$("#enhancementDetails").html(details);
			$(".refreshDetailsButton").data("messageID", messageID);
			$(".refreshDetailsButton").data("type", data.type);
		}
	}