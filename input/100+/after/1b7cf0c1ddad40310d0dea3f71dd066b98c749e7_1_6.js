function addElementButton(element, parentId, buttonContainer, elementContainer, xml, parentPath, childElement, count, indent) {

		if(childElement == undefined) alert('childElement is undefined; element: '+element.title+' '+count);

		$('<span/>').attr({'id' : parentId+'_'+childElement.title+'_Add'}).html(childElement.title).appendTo(buttonContainer);

		 $('#'+parentId+'_'+childElement.title+'_Add').on('click', addElementButtonCallback(element, parentId, elementContainer, xml, parentPath, childElement, count, indent));
}