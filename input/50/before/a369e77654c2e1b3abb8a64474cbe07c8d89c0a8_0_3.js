function () {
		$('div[id^="add-comment-"]').remove();

		var goalId = $(this).attr("id").replace("add-on-course-link-", "");

		postAchievement(goalId, "", "oncourse", "");

		return false;
	}