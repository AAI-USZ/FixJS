function (comment_post) {
	"use strict";

	var newComment, url;

	if (!comment_post) {
		return;
	}

	url = comment_post.action + '/comment/' + comment_post.slug.value;
	$('#comment_post').submit(genericFormHandler(url, function (body) {
		if (typeof body === 'object') {
			newComment = $('#newcomment');
			newComment.find('.author strong').text(body.author);
			newComment.find('time').text(body.date);
			newComment.find('.body').html(body.text);
			newComment.show();
			$(this).hide();
			$('.nocomments').hide();
		} else {
			$(this).find('#texterror').text('Error: ' + body).show();
		}
	}));
}