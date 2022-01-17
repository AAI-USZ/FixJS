function() {
      this.element.find("*").removeAttr("disabled").show();
      this.nextButton.unbind("click").val(this.nextButtonInitinalValue).removeClass("ui-state-disabled").addClass("ui-state-active");
      this.backButton.unbind("click").val(this.backButtonInitinalValue).removeClass("ui-state-disabled").addClass("ui-state-active");
      this.backButtonInitinalValue = undefined;
      this.nextButtonInitinalValue = undefined;
      this.previousStep = undefined;
      this.currentStep = undefined;
      this.isLastStep = undefined;
      this.options = undefined;
      this.nextButton = undefined;
      this.backButton = undefined;
      this.formwizard = undefined;
      this.element = undefined;
      this.steps = undefined;
      this.firstStep = undefined;
    }