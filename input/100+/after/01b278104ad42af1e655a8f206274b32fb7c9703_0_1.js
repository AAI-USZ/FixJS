function(step) {
      var fragment;
      if (step === undefined || step === "") {
        step = this._stepFromPath() || this.firstStep;
      }

      if (this.currentStep !== step || step === this.firstStep) {
        this.previousStep = this.currentStep;
        this._checkIflastStep(step);
        this.currentStep = step;
        var stepShownCallback = function() {
          $(this.element).trigger('step_shown', this._state());
        };
        this._animate(this.previousStep, step, stepShownCallback);
      }

    }