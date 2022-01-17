function (me) {
    try {
      if (gameMode=='qlearning') iterate(me);
      else eval(userCode);
    }
    catch (err) {
      window.alert(err);
      stop();
      return (false);
    }
    return (true);
  }