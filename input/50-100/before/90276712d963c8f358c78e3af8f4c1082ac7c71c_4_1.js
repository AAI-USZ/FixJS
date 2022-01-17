function ($dom) {
		var target = baidu.dom('.item-1, .item-c').closest('ul');
		equal(target.length, 2);
		equal(target[0].className, 'level-3');
		equal(target[1].className, 'level-2');
	}