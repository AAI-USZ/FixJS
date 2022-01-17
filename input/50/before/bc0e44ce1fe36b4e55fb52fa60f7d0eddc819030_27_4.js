function() {
      calledNext = false;
      view = new View();
      result = subject._wrapObject(view);
      callResult({});
    }