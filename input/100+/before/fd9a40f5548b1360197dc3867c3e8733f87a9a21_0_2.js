function show ( error, origin, lineNumber ) {
        var errorType, header, explanation, nerdtalk, extra, article, articleHeight, animSpeed = 500;
        
        // does id not match a specific error
        if ( errorTypes.hasOwnProperty( error ) ) {
           errorType = error;
        }
		else {
			errorType = 'general';
		}
    
        // header
        header = document.createElement('header');
		$(header).addClass( 'title_alt text_huge' );
        $(header).html(errorTypes[errorType].header);
        
        // explanation
        explanation = document.createElement('p');
        $(explanation).addClass("error_explanation");
        $(explanation).html(errorTypes[errorType].explanation);
        
        // extra
        if (errorTypes[errorType].browser_extra === true) {
            extra = document.createElement('div');
            $(extra).addClass("browsers");
            $(extra).html(browser_html);
        }
        
        // article
        article = document.createElement('article');
        $(article).addClass("error info_panel unselectable");
        $(article).attr('id', errorType);
        
        // add to display
        $(article).append(header);
        $(article).append(explanation);
        shared.domElements.$errors.append(article);
        
        // set height and negative margin-top
        // no need to position, css top/left at 50%
        articleHeight = $(header).outerHeight() + $(explanation).outerHeight();
        
        // append extra if needed
        if(typeof extra !== 'undefined') {
            $(article).append(extra);
            articleHeight = articleHeight + $(extra).outerHeight();
            $(extra).fadeOut(0).fadeIn(animSpeed);
        }
		
		// error message, origin, and line number
		
		if ( typeof origin  !== 'undefined' && typeof lineNumber !== 'undefined' ) {
			
			nerdtalk = document.createElement('p');
			$(nerdtalk).addClass("nerdtalk");
			$(nerdtalk).html( "the error was -> '" + error + "' in " + origin + " at line # " + lineNumber);
			$(article).append(nerdtalk);
			articleHeight = articleHeight + $(nerdtalk).outerHeight();
            $(nerdtalk).fadeOut(0).fadeIn(animSpeed);
			
		}
        
        // fade and slide smoothly to new values
        $(header).fadeOut(0).fadeIn(animSpeed);
        $(explanation).fadeOut(0).fadeIn(animSpeed);
        $(article).animate({
            'height': articleHeight, 
            'margin-top': Math.round(-articleHeight * 0.5)
        }, animSpeed);
        
        // store
        errorCurrent.domElements = {
            article: article, 
            header: header, 
            explanation: explanation,
            extra: extra
        };
    }