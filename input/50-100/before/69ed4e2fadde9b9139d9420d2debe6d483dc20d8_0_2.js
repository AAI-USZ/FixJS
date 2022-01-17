function (beforeDiv,msgArr){
	    
	    $('#success').remove();
	    var warning = '<div class="block-success" id="success"><ul>';
	    
	    for(var i = 0; i < msgArr.length ; i++ ){		
		warning += '<li>'+msgArr[i]+'</li>';	
	    }		
	    
	    warning += '</ul></div>';
	    beforeDiv.before(warning);
	    scroll(0,0);
	    $('#success').slideDown(200);
	    setTimeout('$("#success").slideUp()', 2000);
	    
	}