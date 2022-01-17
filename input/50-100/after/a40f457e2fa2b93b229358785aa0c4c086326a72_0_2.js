function formatComment(comment) {
	return "<div class='comment'>"
			+ "<div class='questionText'>" + comment._source.body + "</div>"
			+ "<div class='questionData'>"
				+ "<div>Asked "
					+ "<span class='inserted'>" + jQuery.timeago(new Date(comment._source.timestamp)) + "</span> "
					+ "by <span class='inserted'>" + comment._source.user + "</span></div>"
				+ "<div class='votes'><img src='../images/rqra/up.png' alt='UpVotes'/>" + comment._source.upvote + " </div>"
				+ "<div class='votes'><img src='../images/rqra/down.png' alt='DownVotes'/>" + comment._source.downvote + " </div>"
			+ "</div>";
}