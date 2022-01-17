function() {
    storage.addEmail("testuser@testuser.com", { type: "primary" });
    storage.addEmail("testuser2@testuser.com", { type: "primary" });

    lib.setOrigin("http://testdomain.org");

    lib.setOriginEmail("testuser@testuser.com");
    equal(lib.getOriginEmail(), "testuser@testuser.com", "correct email");

    lib.setOrigin("http://othertestdomain.org");
    lib.setOriginEmail("testuser2@testuser.com");

    lib.setOrigin("http://testdomain.org");
    equal(lib.getOriginEmail(), "testuser@testuser.com", "correct email");
  }