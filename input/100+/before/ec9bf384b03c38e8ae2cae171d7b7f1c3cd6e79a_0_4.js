function(){
      this.element.resetForm();
      $("label,:input,textarea",this).removeClass("error");
      for(var i = 0; i < this.activatedSteps.length; i++){
        this.steps.filter("#" + this.activatedSteps[i]).hide().find(":input").attr("disabled","disabled");
      }
      this.activatedSteps = [];
      this.previousStep = undefined;
      this.isLastStep = false;
      if (this.options.historyEnabled) {
        this._updateHistory(this.firstStep);
      } else {
        this._show(this.firstStep);
      }
    }