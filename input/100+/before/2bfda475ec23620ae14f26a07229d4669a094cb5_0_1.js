function () {
		var url = "/" + $("#path-id").val() + "/add-goal";
		var addGoalButton = $(this)
		addGoalButton.addClass("disabled");
		addGoalButton.val("saving");

		$.post(url, { "name": $("#goal-name").val() }, function (data) {
		
		
			//data is the path object
			$.get("/Content/js/templates/goal.add.mustache.html", function (template) {
				var template = Mustache.render(template, data);
				$("#goals-list").append(template);
				$("#goal-name").val("");
				$("#goal-name").focus();

				addGoalButton.removeClass("disabled");
				addGoalButton.val("add goal");
			});
		});
	}