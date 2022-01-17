function updateChapterMarks(player, marks) {
		var doLinkMarks = marks.closest('table').hasClass('linked');

		marks.each(function () {
			var deepLink,
				mark       = $(this),
				startTime  = mark.data('start'),
				endTime    = mark.data('end'),
				isEnabled  = mark.data('enabled'),
				isBuffered = player.buffered.end(0) > startTime,
				isActive   = player.currentTime > startTime - 0.3 &&
						player.currentTime <= endTime;

			if (isActive) {
				mark
					.addClass('active')
					.siblings().removeClass('active');
			}
			if (!isEnabled && isBuffered) {
				deepLink = '#t=' + generateTimecode([startTime, endTime]);

				mark.data('enabled', true);

				if (doLinkMarks && mark.find('a').length === 0) {
					mark.find('td.title')
						.wrapInner('<a href="' + deepLink + '" />');
				}
			}
		});
	}