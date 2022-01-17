function() {
        if (!form.isValid(settings.validators)) {
          return eventData.stopImmediatePropagation();
        }
      }