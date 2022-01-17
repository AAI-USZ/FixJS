function addElementButton(element, elementContainerId, container, xml, parentPath, childElement, count, indent) {

		if(childElement == undefined) alert('childElement is undefined; element: '+element.title+' '+count);

		$('<span/>').attr({'id' : elementContainerId+'_'+childElement.title+'_Add'}).html(childElement.title).appendTo(container);

		 $('#'+elementContainerId+'_'+childElement.title+'_Add').on('click', addElementButtonCallback(element, elementContainerId, xml, parentPath, childElement, count, indent));
}