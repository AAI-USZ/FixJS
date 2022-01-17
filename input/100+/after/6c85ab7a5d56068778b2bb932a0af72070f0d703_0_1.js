function () {
	"use strict";

	if (!$('section.comments').length) {
		return; // No comments
	}

	var time = Date.now(),
		url = location.pathname;

	setInterval(function () {
		var i, newComment,
			data = {timestamp: Math.round(time / 1000)};

		$.get(url, data, function (comments) {
			if ($.isArray(comments) && comments.length) {
				for (i = 0; i < comments.length; i++) {
					newComment = $('#newcomment').clone()
						.insertBefore('#comment_post')
						.slideDown();

					if (comments[i].website) {
						newComment.find('.author strong')
							.html('<a></a>')
							.find('a')
								.attr('href', comments[i].website)
								.text(comments[i].author);
					} else {
						newComment.find('.author strong')
							.text(comments[i].author);
					}

					newComment.find('time').text(comments[i].date);
					newComment.find('.body').html(comments[i].text);
				}

				$('.nocomments').hide();
			}

			time = Date.now();
		});
	}, 15000);
}