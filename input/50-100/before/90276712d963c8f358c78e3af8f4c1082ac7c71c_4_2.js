function ($dom) {
		var target = $('.item-1, .item-c').closest('ul');
		equal(target.length, 2, '(JQuery)');
		equal(target[0].className, 'level-3', '(JQuery)');
		equal(target[1].className, 'level-2', '(JQuery)');
	}