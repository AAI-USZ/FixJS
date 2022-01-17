function(template, data, oncomplete) {
      screens.error.show(template, data);

      bid.ErrorDisplay.start();

      oncomplete && oncomplete(false);
    }