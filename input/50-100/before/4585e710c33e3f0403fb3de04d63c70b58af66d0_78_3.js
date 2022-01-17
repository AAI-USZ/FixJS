function() {
    xhr.useResult("primary");
    provisioning.setStatus(provisioning.AUTHENTICATED);

    mediator.subscribe("primary_user_provisioned", function(msg, info) {
      equal(info.email, "unregistered@testuser.com", "user is provisioned after requesting info from backend");
      start();
    });

    createController({
      email: "unregistered@testuser.com"
    });
  }