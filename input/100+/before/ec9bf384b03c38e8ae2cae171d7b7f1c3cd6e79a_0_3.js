function(step) {
      var backwards = false;
      var triggerStepShown = step !== undefined;
      var fragment;
      if (step === undefined || step === "") {
        step = this._stepFromPath() || this.firstStep;
        this.activatedSteps.pop();
        this.activatedSteps.push(step);
      } else {
        if ($.inArray(step, this.activatedSteps) > -1) {
          backwards = true;
          this.activatedSteps.pop();
        } else {
          this.activatedSteps.push(step);
        }
      }

      // console.log("Showing step " + step);

      if (this.currentStep !== step || step === this.firstStep) {
        this.previousStep = this.currentStep;
        this._checkIflastStep(step);
        this.currentStep = step;
        var stepShownCallback = function() {
          if (triggerStepShown) {
            $(this.element).trigger('step_shown', $.extend({"isBackNavigation" : backwards}, this._state()));
          }
        };
        this._animate(this.previousStep, step, stepShownCallback);
      }

    }