function createSimpleTIC(context) {
		var callStack = {},
		placeholder,
		timedInvocationChain = createTimedInvocationChain(context, callStack, function(elements){
			/*
			 * Super-fast copying of current elements into our placeholder object.
			 * This enables re-using our placeholder via jQuery(...)
			 */
			placeholder.length = 0;
			Array.prototype.push.apply(placeholder, jQuery.makeArray(elements));
		});
		return placeholder = createPlaceholder(context, callStack, timedInvocationChain);
	}