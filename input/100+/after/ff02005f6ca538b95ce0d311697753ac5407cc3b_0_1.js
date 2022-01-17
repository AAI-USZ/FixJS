function () {
	"use strict";

	var commentPost = $('#comment_post')[0],
		newComment, url;

	if (!commentPost) {
		return;
	}

	url = commentPost.action + '/comment/' + commentPost.slug.value;
	$('#comment_post').submit(genericFormHandler(url, function (body) {
		if (typeof body === 'object') {
			newComment = $('#newcomment');
			newComment.find('.author strong').text(body.author);
			newComment.find('time').text(body.date);
			newComment.find('.body').html(body.text);
			newComment.show();
			this.hide();
			$('.nocomments').hide();
		} else {
			this.find('#texterror').text('Error: ' + body).show();
		}
	}));
}