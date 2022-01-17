function (beforeDiv,msgArr){

	    $('#error').remove();
	    var warning = '<div id="error" class="formMessages"><span class="fmIcon bad"></span> <span class="fmText"><ul>';
	    
	    for(var i = 0; i < msgArr.length ; i++ ){		
	    	warning += '<li>'+msgArr[i]+'</li>';	
	    }		
	    
	    warning += '</ul></span><span class="clear">&nbsp;</span></div>';
	    beforeDiv.before(warning);
	    scroll(0,0);
	    $('#error').slideDown(200);
	    
	}