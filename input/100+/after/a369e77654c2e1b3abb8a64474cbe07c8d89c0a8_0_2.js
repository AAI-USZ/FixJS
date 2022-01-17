function () {
		var goalId = $(this).attr("id").replace("view-goal-", "");
		var urlPattern = "/" + $("#path-id").val() + "/view-goal/" + goalId;
		var url = urlPattern + "/0";

		$("#view-goal").remove();

		$.get(url, function (data, status) {
			//data is the AchievementView object
			//data is the AchievementView object
			$.get("/Content/js/templates/achievement.view.mustache.html", function (template) {
				var achievement = Mustache.render(template, data);
				$("#container").append(achievement);
				$('#view-goal').modal('show');

				var page = 1;
				var loading = false;
				$("#view-goal").scroll(function () {
					if ($("#view-goal").scrollTop() >= $("#view-goal").height() * page) {
						if (loading == false) {
							loading = true;
							console.log("like loading");
							var urls = urlPattern + "/" + page;
							$.get(urls, function (data, status) {
								$.get("/Content/js/templates/achievement.load.mustache.html", function (template) {
									var gList = { list: data.m.AllAchievements }
									var list = Mustache.render(template, gList);
									$("#all-list").append(list);

									gList.list = data.m.MyAchievements
									list = Mustache.render(template, gList);
									$("#my-list").append(list);

									gList.list = data.m.OnCourseAchievements
									list = Mustache.render(template, gList);
									$("#on-course-list").append(list);

									$("#on-course-count-" + goalId).text(data.m.OnCourseAchievements.length);

									gList.list = data.m.AstrayAchievements
									list = Mustache.render(template, gList);
									$("#astray-list").append(list);

									$("#astray-count-" + goalId).text(data.m.AstrayAchievements.length);
								});


								console.log(data);

								loading = false;
								page++;
							});

						}
					}
				});

			});
		});

		return false;
	}