function() {
      joePrivate.getGlobalSuite().exit();
      if (!joe.hasExited()) {
        return joe.exit();
      }
    }