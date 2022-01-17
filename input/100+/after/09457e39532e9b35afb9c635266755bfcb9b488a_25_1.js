function normal(source, state) {
	if (source.match(/^\\[a-zA-Z@]+/)) {
	    var cmdName = source.current();
	    cmdName = cmdName.substr(1, cmdName.length-1);
            var plug;
            if (plugins.hasOwnProperty(cmdName)) {
	      plug = plugins[cmdName];
            } else {
              plug = plugins["DEFAULT"];
            }
	    plug = new plug();
	    pushCommand(state, plug);
	    setState(state, beginParams);
	    return plug.style;
	}

        // escape characters 
        if (source.match(/^\\[$&%#{}_]/)) {
          return "tag";
        }

        // white space control characters
        if (source.match(/^\\[,;!\/]/)) {
          return "tag";
        }

	var ch = source.next();
	if (ch == "%") {
            // special case: % at end of its own line; stay in same state
            if (!source.eol()) {
              setState(state, inCComment);
            }
	    return "comment";
	} 
	else if (ch=='}' || ch==']') {
	    plug = peekCommand(state);
	    if (plug) {
		plug.closeBracket(ch);
		setState(state, beginParams);
	    } else
		return "error";
	    return "bracket";
	} else if (ch=='{' || ch=='[') {
	    plug = plugins["DEFAULT"];	    
	    plug = new plug();
	    pushCommand(state, plug);
	    return "bracket";	    
	}
	else if (/\d/.test(ch)) {
	    source.eatWhile(/[\w.%]/);
	    return "atom";
	}
	else {
	    source.eatWhile(/[\w-_]/);
	    return applyMostPowerful(state);
	}
    }