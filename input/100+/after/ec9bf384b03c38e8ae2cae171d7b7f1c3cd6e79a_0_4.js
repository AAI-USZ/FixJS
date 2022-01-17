function(){
      this.element.resetForm();
      $("label,:input,textarea",this).removeClass("error");
      this.previousStep = undefined;
      this.isLastStep = false;
      this._updateHistory(this.firstStep);
    }