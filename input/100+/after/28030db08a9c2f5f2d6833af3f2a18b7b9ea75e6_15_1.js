function(div) {

		count++;// children传入到函数中的应该是每一个元素

		ok(baidu.e(this).hasClass('test'), '检测class之外同时检测this指针');

	}