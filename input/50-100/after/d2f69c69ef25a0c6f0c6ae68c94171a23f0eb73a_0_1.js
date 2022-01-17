function(){

    	// this is a bit gross and dojo specific, but...... guess a necisary evil.

    	   	

    	var documentHeader = this._srcDocument.find({elementType: "HTMLElement", tag: 'head'}, true);

    	var scriptsInHeader = documentHeader.find({elementType: "HTMLElement", tag: 'script'});

    	for(var i=0;i<scriptsInHeader.length;i++){

    		var text = scriptsInHeader[i].getText();

    		if(text.indexOf("dojo.require") > -1) {

    			return scriptsInHeader[i];    			

    		}

    	}

    	// no requires js header area found

    	return null;

    }