function() {
    this.abortbutton.style.display = this.processing? "inline":"none";
    this.generateStlButton.style.display = ((!this.hasstl)&&(this.validcsg))? "inline":"none";
    this.downloadStlLink.style.display = this.hasstl? "inline":"none";
    this.parametersdiv.style.display = (this.paramControls.length > 0)? "block":"none";
    this.errordiv.style.display = this.hasError? "block":"none";
    this.statusdiv.style.display = this.hasError? "none":"block";    
  }