function examAddComment(comment, target) {
	$("<p class='comment'></p>")
		.text(comment.Comment.comment + " ")
		.append($('<span class="comment-author"></span>')
			.text(comment.Comment.User.username)
		)
		.appendTo(target);
}