function (beforeDiv,msgArr){
	    
	    $('#success').remove();
	    var warning = '<div id="success" class="formMessages"><span class="fmIcon good"></span> <span class="fmText"><ul>';
	    
	    for(var i = 0; i < msgArr.length ; i++ ){		
		warning += '<li>'+msgArr[i]+'</li>';	
	    }		
	    
	    warning += '</ul></span><span class="clear">&nbsp;</span></div>';
	    beforeDiv.before(warning);
	    scroll(0,0);
	    $('#success').slideDown(200);
	    setTimeout('$("#success").slideUp()', 2000);
	    
	}