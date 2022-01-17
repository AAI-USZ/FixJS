function(){
    console.log(this);
    if(toggleState ==1){
      this.setVisible(false);
    }
    else{
      this.setVisible(true);
    }
  }