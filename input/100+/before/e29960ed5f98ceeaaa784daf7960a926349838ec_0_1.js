function() {

      var wizard = this;
      var formOptionsSuccess = this.options.formOptions.success;
      var formOptionsComplete = this.options.formOptions.complete;
      var formOptionsBeforeSend = this.options.formOptions.beforeSend;
      var formOptionsBeforeSubmit = this.options.formOptions.beforeSubmit;
      var formOptionsBeforeSerialize = this.options.formOptions.beforeSerialize;
      var $firstStep;

      this.options.formOptions = $.extend(this.options.formOptions, {
        success  : function(responseText, textStatus, xhr) {
          if (formOptionsSuccess) {
            formOptionsSuccess(responseText, textStatus, xhr);
          }
          if(wizard.options.formOptions && wizard.options.formOptions.resetForm || !wizard.options.formOptions){
            wizard._reset();
          }
        },
        complete : function(xhr, textStatus){
          if(formOptionsComplete){
            formOptionsComplete(xhr, textStatus);
          }
          wizard._enableNavigation();
        },
        beforeSubmit : function(arr, theForm, options) {
          if(formOptionsBeforeSubmit){
            var shouldSubmit = formOptionsBeforeSubmit(arr, theForm, options);
            if(!shouldSubmit)
              wizard._enableNavigation();
            return shouldSubmit;
          }
        },
        beforeSend : function(xhr) {
          if(formOptionsBeforeSend){
            var shouldSubmit = formOptionsBeforeSend(xhr);
            if(!shouldSubmit)
              wizard._enableNavigation();
            return shouldSubmit;
          }
        },
        beforeSerialize: function(form, options) {
          if(formOptionsBeforeSerialize){
            var shouldSubmit = formOptionsBeforeSerialize(form, options);
            if(!shouldSubmit)
              wizard._enableNavigation();
            return shouldSubmit;
          }
        }
      });

      this.steps = this.element.find(".step").hide();

      this.firstStep = this.options.firstStep || this.steps.eq(0).attr("id");

      $firstStep = this._stepElement(this.firstStep);
      console.log("Got step: " + $firstStep.attr("id"));
      if ($firstStep.data("page-title") !== undefined) {
        $("title").text($firstStep.data("page-title"));
      }

      this.activatedSteps = [];
      this.isLastStep = false;
      this.previousStep = undefined;
      this.currentStep = this.firstStep;

      this._updateButtons();

      if (this.options.validationEnabled && jQuery().validate === undefined) {
        this.options.validationEnabled = false;
        if ( (window['console'] !== undefined) ) {
          console.log("%s", "validationEnabled option set, but the validation plugin is not included");
        }
      } else if(this.options.validationEnabled) {
        this.element.validate(this.options.validationOptions);
      }
      if (this.options.formPluginEnabled && jQuery().ajaxSubmit === undefined) {
        this.options.formPluginEnabled = false;
        if ( (window['console'] !== undefined) ) {
          console.log("%s", "formPluginEnabled option set but the form plugin is not included");
        }
      }

      if (this.options.disableInputFields === true) {
        $(this.steps).find(":input:not('.wizard-ignore')").attr("disabled","disabled");
      }

      if (this.options.historyEnabled) {
        History.Adapter.bind(window, 'statechange', function() {
          var state;
          var step;
          state = History.getState();
          step = state.data.step;
          if (step !== wizard.currentStep) {
            if (wizard.options.validationEnabled && step === wizard._navigate(wizard.currentStep)) {
              if (!wizard.element.valid()) {
                wizard._show(wizard.currentStep);
                wizard.element.validate().focusInvalid();

                return false;
              }
            }
            if (step !== wizard.currentStep) {
              wizard._show(step);
            }
          }
        });
      }

      this.element.addClass("ui-formwizard");
      this.element.find(":input").addClass("ui-wizard-content");
      this.steps.addClass("ui-formwizard-content");
      this.backButton.addClass("ui-formwizard-button ui-wizard-content");
      this.nextButton.addClass("ui-formwizard-button ui-wizard-content");

      if(!this.options.disableUIStyles){
        this.element.addClass("ui-helper-reset ui-widget ui-widget-content ui-helper-reset ui-corner-all");
        this.element.find(":input").addClass("ui-helper-reset ui-state-default");
        this.steps.addClass("ui-helper-reset ui-corner-all");
        this.backButton.addClass("ui-helper-reset ui-state-default");
        this.nextButton.addClass("ui-helper-reset ui-state-default");
      }
      this._show(undefined);
      return $(this);
    }