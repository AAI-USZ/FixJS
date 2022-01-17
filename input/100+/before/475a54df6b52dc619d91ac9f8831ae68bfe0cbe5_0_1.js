function (data) {
			//data is the path object
			$.get("/Content/js/templates/goal.add.mustache.html", function (template) {
				var template = Mustache.render(template, data);
				$("#goals-list").prepend(template);
				$("#goal-name").val("");
				$("#goal-name").focus();

				$(this).removeClass("disabled");
				$(this).val("add goal");
			});
		}