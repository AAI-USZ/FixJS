function createController(verifier, message, required, password) {
    controller = bid.Modules.CheckRegistration.create();
    controller.start({
      email: "registered@testuser.com",
      password: password,
      verifier: verifier,
      verificationMessage: message,
      required: required,
      siteName: "Unit Test Site"
    });
  }