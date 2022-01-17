function (beforeDiv,msgArr){

	    $('#error').remove();
	    var warning = '<div class="block-error" id="error"><ul>';
	    
	    for(var i = 0; i < msgArr.length ; i++ ){		
	    	warning += '<li>'+msgArr[i]+'</li>';	
	    }		
	    
	    warning += '</ul></div>';
	    beforeDiv.before(warning);
	    scroll(0,0);
	    $('#error').slideDown(200);
	    setTimeout('$("#error").slideUp()', 3000);
	    
	}