function (data) {

			if(typeof data != "object"){
				location = location.protocol + "//" + location.host + "?returnUrl=" + location.pathname;
				return;
			}

			$("#add-comment-" + achievementId).html("<p>" + markdown.Transform(comment) + "</p>");
		}