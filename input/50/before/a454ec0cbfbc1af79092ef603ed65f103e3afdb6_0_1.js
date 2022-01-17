function () {
    if (state === $jsilcore.PropertyNotInitialized) {
      state = getValue();
      JSIL.Host.runLater(cleanup);
    }

    return state;
  }