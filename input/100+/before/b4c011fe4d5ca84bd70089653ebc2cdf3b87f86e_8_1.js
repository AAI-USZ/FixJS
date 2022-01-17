function(event){
	
		shipSelectList.remove();
		
		event.stopPropagation(event);
        if (gamedata.effectsDrawing)
			return;
			
        //console.log(event.handled);
        scrolling.scrolling = true;
        scrolling.scrollingstarted = ((new Date()).getTime())
        
        var location = $(this).elementlocation();
        var x = event.pageX - location.x;
        var y = event.pageY - location.y;
        scrolling.lastpos.x = x;
        scrolling.lastpos.y = y;
        
        //console.log(x + "," + y);
    }