function() {
    controller.destroy();
    createController({ cancelable: false });
    testElementNotExists("#cancel");
  }