function(e){
      if(e.which == 17){
	prevMode = specialMode;
	specialMode=true;
	delta = null;
	foxtrot = 0;
	hotel = 0;
	$(kb.focusBox).after(typeModeIcon);
      }
      if(e.which == specialCode['ESCAPE']){
	specialMode = false;
	delta = null;
	foxtrot = 0;
	hotel = 0;
	$(typeModeIcon).remove();
      }
      if(e.ctrlKey){
	specialMode = prevMode;
	if(!specialMode){
	  $(typeModeIcon).remove();
	}
      }
    }