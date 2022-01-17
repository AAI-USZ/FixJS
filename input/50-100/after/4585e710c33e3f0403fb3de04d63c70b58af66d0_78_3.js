function() {
    provisioning.setStatus(provisioning.AUTHENTICATED);
    xhr.useResult("primary");

    mediator.subscribe("primary_user_provisioned", function(msg, info) {
      equal(info.email, "unregistered@testuser.com", "user is provisioned after requesting info from backend");
      start();
    });

    createController({
      email: "unregistered@testuser.com"
    });
  }