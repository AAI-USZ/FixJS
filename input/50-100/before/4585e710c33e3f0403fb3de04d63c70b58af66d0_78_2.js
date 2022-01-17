function() {
    provisioning.setStatus(provisioning.NOT_AUTHENTICATED);

    mediator.subscribe("primary_user_unauthenticated", function(msg, info) {
      equal(info.auth_url, "https://auth_url", "primary information fetched");
      start();
    });

    createController({
      email: "unregistered@testuser.com",
      auth: "https://auth_url",
      prov: "https://prov_url"
    });
  }