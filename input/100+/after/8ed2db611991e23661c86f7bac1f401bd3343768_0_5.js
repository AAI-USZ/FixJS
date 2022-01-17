function(event) {
            if (event.source == window && event.data == "jqm-asap") {
                event.stopPropagation();
                if (timeouts.length > 0) {	//just in case...
                    (timeouts.shift()).apply(contexts.shift(), params.shift());
                }
            }
        }