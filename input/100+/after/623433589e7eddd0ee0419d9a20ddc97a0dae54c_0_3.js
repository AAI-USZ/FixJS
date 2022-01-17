function(e){
      if(e.target == kb.focusBox){
	if(e.which == 17 && specialMode){
	  console.log('newchar');
	  delta = null;
	  foxtrot = 0;
	  hotel = 0;
	}
	if(e.which == specialCode['ESCAPE']){
	  specialMode = false;
	  delta = null;
	  foxtrot = 0;
	  hotel = 0;
	  $(typeModeIcon).remove();
	}
	if(e.ctrlKey && e.which == specialCode['SHIFT']){
	  specialMode=true;
	  delta = null;
	  foxtrot = 0;
	  hotel = 0;
	  $(kb.focusBox).after(typeModeIcon);
	}
      }
    }