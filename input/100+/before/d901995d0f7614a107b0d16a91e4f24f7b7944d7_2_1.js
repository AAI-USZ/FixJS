function(){
	//expect(1);
	var div = document.createElement('div');
	ok(!baidu.dom(div).hasClass("class"),"no class");
}