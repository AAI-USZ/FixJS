function (data) {
			//data is the AchievementView object
			$.get("/Content/js/templates/achievement.add.mustache.html", function (template) {
				var achievement = Mustache.render(template, data.AchievementView);
				$("#all-list").prepend(achievement);
				$("#my-list").prepend(achievement);
				$("#on-course-list").prepend(achievement);
				if (resolution == "oncourse") {
					$("#last-oncourse-" + goalId).html(achievement);
					$("#on-course-count-" + goalId).text(data.OnCourseCount);
				} else {
					$("#last-astray-" + goalId).html(achievement);
					$("#astray-count-" + goalId).text(data.AstrayCount);
				}

				$("#achievement-" + data.AchievementView.Id + "-goal-id").val(goalId);

				$("#dynamic-comment-" + data.AchievementView.Id).focus();

			});

			if (comment != "")
				$(commentTemplateName + goalId).val("");

		}