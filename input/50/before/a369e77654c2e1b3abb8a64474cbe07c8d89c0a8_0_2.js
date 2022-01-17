function () {
		$('div[id^="add-comment-"]').remove();

		var goalId = $(this).attr("id").replace("add-astray-link-", "");

		postAchievement(goalId, "", "astray", "");

		return false;
	}