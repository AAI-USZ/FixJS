function() {
      // number_emails will not be added to KPI data because sampling is
      // disabled.
      controller.disable();
      mediator.publish("kpi_data", { number_emails: 1 });
      testHelpers.testUndefined(controller.getCurrent());

      // number_emails will be added to KPI data because sampling is
      // disabled.
      controller.enable();
      mediator.publish("kpi_data", { number_emails: 2 });
      testHelpers.testObjectValuesEqual(controller.getCurrent(), {
        number_emails: 2
      });

      start();
    }