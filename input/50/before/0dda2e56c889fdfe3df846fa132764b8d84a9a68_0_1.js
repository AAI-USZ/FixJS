function() {
				// NEEDS INPUT VALIDATION!!
				var urlstring = "/gmas/dispatch?formName=SegmentHomeForm&ProjectListSegmentHomeEvent=&segmentId=";
				$(this).dialog("close");
				window.location = $("#env").val() + urlstring + $.trim($("#segmentId").val());			
			}