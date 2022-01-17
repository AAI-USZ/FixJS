function (data) {

			if(typeof data != "object"){
				location = location.protocol + "//" + location.host + "?returnUrl=" + location.pathname;
				return;
			}

			//data is the path object
			$.get("/Content/js/templates/goal.add.mustache.html", function (template) {
				var template = Mustache.render(template, data);
				$("#goals-list").append(template);
				$("#goal-name").val("");
				$("#goal-name").focus();

				addGoalButton.removeClass("disabled");
				addGoalButton.val("add goal");
			});
		}