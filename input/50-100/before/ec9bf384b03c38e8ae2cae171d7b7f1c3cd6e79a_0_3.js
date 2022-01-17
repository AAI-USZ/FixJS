function(){
          var $firstStep = wizard._stepElement(wizard.firstStep);
          if (current.attr("id") === wizard.firstStep && $firstStep.data("page-title") !== undefined) {
            $("title").text($firstStep.data("page-title"));
          }
          if (wizard.options.focusFirstInput) {
            current.find(":input:first").focus();
          }
          wizard._enableNavigation();

          stepShownCallback.apply(wizard);
        }