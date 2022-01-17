function getBaseUrl() {
		
		var
			baseUrl = './',
			i,
			script,
			scripts = document.getElementsByTagName("script"),
			regexAlohaJs = /\/aloha.js$/,
			regexJs = /[^\/]*\.js$/;
		
        for ( i = 0; i < scripts.length && ( script = scripts[i] ); ++i ) {
        	
            // take aloha.js or first ocurrency of data-aloha-plugins 
        	// and script ends with .js
        	if ( regexAlohaJs.test( script.src ) ) {
        		baseUrl = script.src.replace( regexAlohaJs , '' );
        		break;
        	}            
            if ( baseUrl === './' && script.getAttribute( 'data-aloha-plugins')
            		&& regexJs.test(script.src ) ) {
            	baseUrl = script.src.replace( regexJs , '' );
            }
        }
        
		return baseUrl;
	}