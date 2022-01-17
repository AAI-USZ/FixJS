function showProblem(problem, $dest) {
		var message = $("<span />").text(problem.message);
		var detail = $('<div class="hidden" />');
		var line;

		if (problem.token) {
			line = 'Token: ';
			line += problem.token.type + ' (' + problem.token.content + ')';
			line += ' on line ' + problem.token.line;
			line += ', character ' + problem.token.charNum;
		} else {
			line = 'No token supplied';
		}

		detail.append($('<span />').text(line));
		detail.append('<br>');
		detail.append($('<span />').text('Problem code:  ' + problem.code));

		if (problem.more) {
			detail.append('<br>');
			detail.append($('<span />').text('Full problem code:  ' + problem.code + ':' + problem.more));
		}

		var detailTagShow = $('<span class="detailTag" />').text('[ Show Details ]');
		var detailTagHide = $('<span class="detailTag hidden" />').text('[ Hide Details ]');
		var toggleFunction = function () {
			detail.toggleClass('hidden');
			detailTagShow.toggleClass('hidden');
			detailTagHide.toggleClass('hidden');
		};
		detailTagShow.click(toggleFunction);
		detailTagHide.click(toggleFunction);
		$dest.append(message).append(detailTagShow).append(detailTagHide).append(detail);
		return $dest;
	}