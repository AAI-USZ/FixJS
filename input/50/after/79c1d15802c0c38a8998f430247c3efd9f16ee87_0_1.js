function(eventData) {
        if (!form.isValid(settings.validators)) {
          return eventData.preventDefault();
        }
      }