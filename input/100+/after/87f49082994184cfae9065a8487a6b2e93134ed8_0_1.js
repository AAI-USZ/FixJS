function(exn) {
    // Under google-chrome, this will produce a nice error stack
    // trace that we can deal with.
    if (typeof(console) !== 'undefined' && console.log &&
	exn && exn.stack) {
	console.log(exn.stack);
    }


    var domElt = document.createElement('div');
    domElt.style['color'] = 'red';

    if (exn.domMessage) {
	domElt.appendChild(exn.domMessage);
        console.log(exn.structuredError);
    } else {
	domElt.appendChild(document.createTextNode(evaluator.getMessageFromExn(exn)+""));
    }

    var stacktrace = evaluator.getTraceFromExn(exn);
    for (var i = 0; i < stacktrace.length; i++) {
	domElt.appendChild(document.createElement("br"));
	domElt.appendChild(document.createTextNode(
			     "in " + stacktrace[i].id +
			     ", at offset " + stacktrace[i].offset +
			     ", line " + stacktrace[i].line +
			     ", column " + stacktrace[i].column +
			     ", span " + stacktrace[i].span));
    };
    if(types.isExnFailContractArityWithPosition(exn.val)) {
      domElt.appendChild(document.createTextNode(types.toDisplayedString(
						  types.exnFailContractArityWithPositionLocations(exn.val))));
    }
    writeToInteractions(domElt);
}