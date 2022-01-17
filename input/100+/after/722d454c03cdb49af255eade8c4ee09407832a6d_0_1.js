function(err) {
        var that = this;
        var msg;
        var dom = document.createElement('div');
        if (types.isSchemeError(err) && types.isExnBreak(err.val)) {
            dom['className'] = 'moby-break-error';
            msg = "Program stopped by user (user break)";
        } 
        else {
            dom['className'] = 'moby-error';
            msg = this.evaluator.getMessageFromExn(err);
        }
        var msgDom = document.createElement('div');
        msgDom['className'] = 'moby-error:message';
        /*if (err.domMessage) {
		   console.log(err.domMessage);
            if(! err.structuredError){ 
			dom.appendChild(err.domMessage);
            } else {
                msg = structuredErrorToMessage(err.structuredError);
			}
		}*/
		if(err.structuredError){
		  msg = structuredErrorToMessage(err.structuredError);
		}
		  
				
				
				
		if (! types.isMessage(msg)) {
			if(err.domMessage){
			  dom.appendChild(err.domMessage);
			}
			else {
			  msgDom.appendChild(document.createTextNode(msg));
			}
        } else {
		    //if it is a Message, do special formatting
            specialFormatting(that, msgDom, msg);
        }
        dom.appendChild(msgDom);
	
	
        var stacktrace = this.evaluator.getTraceFromExn(err);
        var stacktraceDiv = document.createElement("div");
        stacktraceDiv['className'] = 'error-stack-trace';
        for (var i = 0; i < stacktrace.length; i++) {
            var anchor = this.createLocationHyperlink(stacktrace[i]);
            stacktraceDiv.appendChild(anchor);
        }
        
        dom.appendChild(stacktraceDiv);
	
        return dom;
    }