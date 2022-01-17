function() {
    createController({
      window: win,
      add: false,
      email: "unregistered@testuser.com",
      auth_url: "http://testuser.com/sign_in",
      requiredEmail: false,
      personaTOSPP: false
    });

    testElementNotExists("#persona_tospp");
  }