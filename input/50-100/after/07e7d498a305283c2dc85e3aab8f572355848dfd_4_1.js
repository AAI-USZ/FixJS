function appendComment(target,comment) {
		target.append($("<p class='comment'></p>")
			.html(comment.comment)
			.append($("<span class='comment-author'></span>")
				.text((comment.User.username) ? comment.User.username : __("unknown"))
			)
		);
	}