function formatQuestion(question) {
	return "<div class='question'>"
			+ "<div class='questionText'>" + question._source.body + "</div>"
			+ "<div class='questionData'>"
				+ "<div class='profResponsesRecent'>5 <img src='../images/rqra/prof.png' alt='Instructor Responses'/></div>"
				+ "<div class='replies'>" + question._source.commentCount + " <img src='../images/rqra/reply.png' alt='Replies'/></div>"
				+ "<div class='views'>" + question._source.viewCount + " <img src='../images/rqra/view.png' alt='Views'/></div>"
				+ "<div>Asked "
					+ "<span class='inserted'>" + jQuery.timeago(new Date(question._source.timestamp)) + "</span> "
					+ "by <span class='inserted'>" + question._source.user + "</span></div>"
			+ "</div>";
}