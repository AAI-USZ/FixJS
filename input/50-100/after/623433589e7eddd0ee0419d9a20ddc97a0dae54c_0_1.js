function(){
	if(kb.focusBox != this || !isVisible){
	  $(kb.html).slideDown(300).center();
	  kb.focusBox = this;
	  hotel=1;
	  specialMode = false; 
	  prevMode = false;
	  $(typeModeIcon).remove();
	  isVisible = true;
	}
    }