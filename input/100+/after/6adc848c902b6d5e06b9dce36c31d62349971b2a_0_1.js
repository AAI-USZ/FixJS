function() {
	
	var ctrl = $.wiredui.buildController("<div1><span>txt${txt}</span><p></p></div1>", {
		"var1": 1
	});
	
	same(1, ctrl.childNodes[0].childNodes[0].childNodes.length);
	same(ctrl.childNodes[0].childNodes[0].childNodes[0].nodeName, "#text");
    console.log(ctrl);
	same(ctrl.childNodes[0].childNodes[0].childNodes[0].nodeValue, "txt");
	
	same(ctrl.childNodeControllers.length, 1);
	var childCtrl = ctrl.childNodeControllers[0].nodeController;
	var pos = ctrl.childNodeControllers[0].position;
	same(pos.idx, 1);
	same(ctrl.childNodes[0].childNodes[0], pos.parentElem);
	same(childCtrl.parentController, ctrl);
	
}