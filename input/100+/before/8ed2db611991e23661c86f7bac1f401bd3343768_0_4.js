function(fn) {
            timeouts.push(fn);
			//post a message to ourselves so we know we have to execute a function from the stack 
            window.postMessage("jqm-asap", "*");
        }