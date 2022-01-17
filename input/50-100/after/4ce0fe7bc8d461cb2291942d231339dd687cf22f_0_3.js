function(taskLine, options) {
        var nextDescription, selector;
        selector = "#" + taskLine.model.id;
        nextDescription = $(selector).prev().find(".description");
        if (nextDescription.length) {
          return this.moveFocus(taskLine.descriptionField, nextDescription, options);
        }
      }