function(){

	expect(1);

	stop();

	ua.importsrc("baidu.dom.append,baidu.dom.each,baidu.dom.trigger,baidu.dom.find,baidu.dom.appendTo,baidu.dom.removeAttr,baidu.dom.insertAfter,baidu.dom.html,baidu.dom.eq,baidu.dom.remove,baidu.dom.removePorp,baidu.dom.contents", function(){

		start();

		prepareTest();

		ok(true,'ok');

	}, "baidu.dom.contents", "baidu.dom.prop");

}