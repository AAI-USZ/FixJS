function startRegCheckService(options, verifier, message, password) {
    var controller = startService("check_registration", {
      verifier: verifier,
      verificationMessage: message,
      password: password,
      siteName: options.siteName
    });
    controller.startCheck();
  }