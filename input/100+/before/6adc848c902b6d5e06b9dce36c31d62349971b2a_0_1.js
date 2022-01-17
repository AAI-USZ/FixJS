function() {
	
	var ctrl = $.wiredui.buildController("<div1><span>txt${txt}</span><p></p></div1>", {
		"var1": 1
	});
	
	same(1, ctrl.childNodes[0].childNodes[0].childNodes.length);
	same("#text", ctrl.childNodes[0].childNodes[0].childNodes[0].nodeName);
	same("txt", ctrl.childNodes[0].childNodes[0].childNodes[0].nodeValue);
	
	same(1, ctrl.childNodeControllers.length);
	var childCtrl = ctrl.childNodeControllers[0].nodeController;
	var pos = ctrl.childNodeControllers[0].position;
	same(1, pos.idx);
	same(ctrl.childNodes[0].childNodes[0], pos.parentElem);
	same(childCtrl.parentController, ctrl);
	
}