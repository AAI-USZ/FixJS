function() {
    // 1. user.user_staged
    // 2. dialog is orphaned
    // 3. user comes back, authenticated
    // 4. the orphan found a good home
    createController(false);
    network.withContext(function() {
      // user is staged
      controller.addEvent("user_staged");
      // dialog all done, its orphaned, oh noes! think of the kids!
      mediator.publish("kpi_data", {
        orphaned: true
      });
      network.clearContext();


      // new page
      createController(false);
      // make user authenticated
      xhr.setContextInfo("auth_level", "password");
      network.withContext(function() {
        var request = xhr.getLastRequest('/wsapi/interaction_data');
        var data = JSON.parse(request.data).data[0];
        equal(data.orphaned, false, "orphaned is not sent")
        start();
      });
    });
  }