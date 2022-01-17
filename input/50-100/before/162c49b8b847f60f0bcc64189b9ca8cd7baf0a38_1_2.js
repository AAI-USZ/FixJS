function() {
    createController();
    network.withContext(function() {
      mediator.publish("kpi_data", { number_emails: 1 });
      testHelpers.testObjectValuesEqual(controller.getCurrent(), {
        number_emails: 1
      });
      start();
    });
  }