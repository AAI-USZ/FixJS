function(){

	//创建一个测试div
	var div = document.createElement('div');
	document.body.appendChild(div);

	//没有className的情况
	ok(!baidu.dom(div).hasClass("class1"),"没有className的情况");

	//一个className情况
	div.className = "class1";
	ok(baidu.dom(div).hasClass('class1'),"一个className情况，有");
	ok(!baidu.dom(div).hasClass('class2'),"一个className情况，没有");

	//多个className情况
	div.className = "class1 class2";
	ok(baidu.dom(div).hasClass('class1 class2'),"多个className情况，有");
	ok(!baidu.dom(div).hasClass('class1 class2 class3'),"多个className情况，没有");
	ok(!baidu.dom(div).hasClass('class1 class3'),"多个className情况，没有");

	//多个className乱序
	div.className = "class1 class2";
	ok(baidu.dom(div).hasClass('class2 class1'),"多个className情况，有");
	ok(!baidu.dom(div).hasClass('class2 class1 class3'),"多个className情况，没有");
	ok(!baidu.dom(div).hasClass('class3 class2'),"多个className情况，没有");

	div.className = "class1 class2 class3";
	ok(baidu.dom(div).hasClass('class2 class1 class3'),"多个className情况，有");
	ok(!baidu.dom(div).hasClass('class2 class1 class3 class4'),"多个className情况，没有");
	ok(baidu.dom(div).hasClass('class3 class2'),"多个className情况，没有");
	
	//异常处理：无参数 
	equal(div,baidu.dom(div).hasClass()[0],"异常处理：无参数");

	document.body.removeChild(div);
}