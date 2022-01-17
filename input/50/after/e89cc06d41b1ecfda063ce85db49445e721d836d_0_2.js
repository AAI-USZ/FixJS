function(){
    if(toggleState ==1){
      this.setVisible(false);
      if(activeInfoWindow)
        activeInfoWindow.close();
    }
    else{
      this.setVisible(true);
    }
  }