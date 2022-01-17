function (me) {
    try {
      eval(userCode);
    }
    catch (err) {
      window.alert(err);
      stop();
      return (false);
    }
    return (true);
  }