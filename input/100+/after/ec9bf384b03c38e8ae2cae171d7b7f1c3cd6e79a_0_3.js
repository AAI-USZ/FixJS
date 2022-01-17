function(step) {
      var fragment;
      if (step === undefined || step === "") {
        step = this._stepFromPath() || this.firstStep;
      }

      if (this.currentStep !== step || step === this.firstStep) {
        console.log("Made it past the first if statement");
        this.previousStep = this.currentStep;
        this._checkIflastStep(step);
        this.currentStep = step;
        var stepShownCallback = function() {
          console.log("Triggering step_shown");
          $(this.element).trigger('step_shown', this._state());
        };
        this._animate(this.previousStep, step, stepShownCallback);
      }

    }