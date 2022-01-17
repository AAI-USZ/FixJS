function showProblemList(target, list) {
		var $target = $(target);
		$target.empty();

		if (list.length === 0) {
			$target.text('None were reported.');
			return;
		}

		var ul = $('<ul />');

		for (var i = 0; i < list.length; i ++) {
			ul.append(showProblem(list[i], $('<li />')));
		}

		$target.append(ul);
	}