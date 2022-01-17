function() {
    provisioning.setStatus(provisioning.AUTHENTICATED);

    mediator.subscribe("primary_user_provisioned", function(msg, info) {
      ok(info.assertion, "assertion available");
      equal(info.email, "unregistered@testuser.com", "email available");
      start();
    });

    createController({
      email: "unregistered@testuser.com",
      auth: "https://auth_url",
      prov: "https://prov_url"
    });
  }