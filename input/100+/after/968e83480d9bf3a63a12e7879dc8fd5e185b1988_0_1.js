function() {
    spy = jasmine.createSpy();
    notCalled = jasmine.createSpy();

    spyOn(logging, 'log');
    spyOn(logging, 'error');

    this.addMatchers({

      toHaveLogged: helper.equalObjectMatcher
    });
  }