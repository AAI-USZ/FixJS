function() {
				// NEEDS INPUT VALIDATION!!
				var urlstring = "/gmas/project/SCR0104SegmentHome.jsp?segmentId=";
				$(this).dialog("close");
				window.location = $("#env").val() + urlstring + $.trim($("#segmentId").val());			
			}