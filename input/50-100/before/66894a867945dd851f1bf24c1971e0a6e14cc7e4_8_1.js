function createController(verifier, message, required) {
    controller = bid.Modules.CheckRegistration.create();
    controller.start({
      email: "registered@testuser.com",
      verifier: verifier,
      verificationMessage: message,
      required: required,
      siteName: "Unit Test Site"
    });
  }