function() {
    this.abortbutton.style.display = this.processing? "inline":"none";
    this.generateOutputFileButton.style.display = ((!this.hasOutputFile)&&(this.hasValidCurrentObject))? "inline":"none";
    this.downloadOutputFileLink.style.display = this.hasOutputFile? "inline":"none";
    this.parametersdiv.style.display = (this.paramControls.length > 0)? "block":"none";
    this.errordiv.style.display = this.hasError? "block":"none";
    this.statusdiv.style.display = this.hasError? "none":"block";    
  }