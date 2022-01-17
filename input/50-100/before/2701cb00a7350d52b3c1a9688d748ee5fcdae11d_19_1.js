function(element, maxLength){
		if(element === document.activeElement){
			if(maxLength == null){
				maxLength = $.prop(element, 'maxlength');
			}
			constrainMaxLength(e.target, maxLength);
		}
	}