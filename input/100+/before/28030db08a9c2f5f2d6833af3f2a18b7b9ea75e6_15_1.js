function() {

	var parentNode = document.body.appendChild(document.createElement('div')),

	//

	childNode1 = parentNode.appendChild(document.createElement('div')),

	//

	childNode2 = parentNode.appendChild(document.createElement('p'));



	var count = 0;

	baidu.e([ parentNode, childNode1, childNode2 ]).each(function(dom, idx) {

		baidu.e(this).addClass('test');// 为每个元素添加class，为后续操作做准备，并检测参数

		equals(idx, count++, 'check parameter index');

		ok(baidu.e(dom).hasClass('test'), 'check parameter dom');

	});

	equals(count, 3, '上面的回调函数应该执行3次');



	count = 0;

	var a_link = document.body.appendChild(document.createElement('a'));

	baidu.e(a_link).addClass('test');

	baidu.e(parentNode).q('test').each(function(item) {

		count++;

		ok(baidu.e(this).hasClass('test'), '检测class之外同时检测this指针');

	});

	equals(count, 2, '上述回调应该执行2次');



	count = 0;

	baidu.e(parentNode).children().each(function(div) {

		count++;// children传入到函数中的应该是每一个元素

		ok(baidu.e(this).hasClass('test'), '检测class之外同时检测this指针');

	});

	equals(count, 2);



	count = 0;

	baidu.e(document).q('test').each(function() {

		count++;

	});

	equals(count, 4, '对document查找，应该是4个元素');



	count = 0;

	baidu.e(document).q('test', 'div').each(function() {

		count++;

	});

	equals(count, 2, '对document查找class是test的div，测试q的第二个参数');



	count = 0;

	baidu.e(document).q('test', 'table').each(function() {

		count++;

	});

	equals(count, 0, '对document查找class是test的table，测试q的第二个参数');

	baidu.e([ parentNode, a_link ]).remove();

}