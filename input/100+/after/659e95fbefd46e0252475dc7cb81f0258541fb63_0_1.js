function( input, output, parser ){
	  var d = new Date();
    var startTime = d.getTime();
    
    
		var oldTokens = output.childNodes;
		var newTokens = parser.tokenize(input);
		
		d = new Date();
    var tokenizerTime = d.getTime();
		
		
		//alert("Tokens| New:"+newTokens.length+" Old: "+oldTokens.length);
		
		
		var firstDiff, lastDiffNew, lastDiffOld;
		// find the first difference
		for( firstDiff = 0; firstDiff < newTokens.length && firstDiff < oldTokens.length; firstDiff++ )
			if( newTokens[firstDiff] !== oldTokens[firstDiff].textContent ) break;
			
	  d = new Date();
    var firstDiffTime = d.getTime();
    var firstDiffSave = firstDiff;
			
		// trim the length of output nodes to the size of the input
		while( newTokens.length < oldTokens.length )
			output.removeChild(oldTokens[firstDiff]);
		// find the last difference
		for( lastDiffNew = newTokens.length-1, lastDiffOld = oldTokens.length-1; firstDiff < lastDiffOld; lastDiffNew--, lastDiffOld-- )
			if( newTokens[lastDiffNew] !== oldTokens[lastDiffOld].textContent ) break;
			
		d = new Date();
    var lastDiff = d.getTime();
    var lastDiffNewSave = lastDiffNew;
    var lastDiffOldSave = lastDiffOld;
    
    
		// update modified spans
		for( ; firstDiff <= lastDiffOld; firstDiff++ ){
			oldTokens[firstDiff].className = parser.identify(newTokens[firstDiff]);
			//oldTokens[firstDiff].textContent = oldTokens[firstDiff].innerText = sanitizeEscapes( newTokens[firstDiff] );
			oldTokens[firstDiff].textContent = oldTokens[firstDiff].innerText = newTokens[firstDiff];
		}
		
		d = new Date();
    var updateTime = d.getTime();
		
		// add in modified spans
		for( var insertionPt = oldTokens[firstDiff] || null; firstDiff <= lastDiffNew; firstDiff++ ){
			var span = document.createElement("span");
			span.className = parser.identify(newTokens[firstDiff]);
			//span.textContent = span.innerText = sanitizeEscapes( newTokens[firstDiff] );
			span.textContent = span.innerText = newTokens[firstDiff];
			output.insertBefore( span, insertionPt );
			
		}
		
		d = new Date();
    var endTime = d.getTime();
    
    
    /*alert("Tokenized In:    "+(tokenizerTime-startTime)     + "ms\n" +
          "FirstDiff In ("+firstDiffSave+"):    "+(firstDiffTime-tokenizerTime) + "ms\n" +
          "Last Diff In ("+lastDiffNew+","+lastDiffOld+"):    "+(lastDiff-firstDiffTime)      + "ms\n" +
          "Update Color In: "+(updateTime-lastDiff)         + "ms\n" +
          "New Color In:    "+(endTime-updateTime)+"ms");/**/
	}