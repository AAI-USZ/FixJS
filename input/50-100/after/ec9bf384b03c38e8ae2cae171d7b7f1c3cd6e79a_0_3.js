function(){
          if (wizard.options.focusFirstInput) {
            current.find(":input:first").focus();
          }
          wizard._enableNavigation();

          stepShownCallback.apply(wizard);
        }