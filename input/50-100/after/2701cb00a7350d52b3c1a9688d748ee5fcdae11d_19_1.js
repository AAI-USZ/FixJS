function(element, maxLength){
		if($(element).is(':focus')){
			if(maxLength == null){
				maxLength = $.prop(element, 'maxlength');
			}
			constrainMaxLength(e.target, maxLength);
		}
	}