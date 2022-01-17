function() {	
		
		var num = $('#'+elementContainerId).children("."+childElement.title+'Instance').length; 

		if((num == undefined) || (num == 0)) num = 1; // if no elements, start with 1 for xpath
		else num = num + 1;
		
		createElement(childElement, xml, parentPath+'/'+element.elementTitle.replace(/\\/g,"")+'['+count+']', num, '#'+elementContainerId, indent);
	}