function () {
    if (state === $jsilcore.PropertyNotInitialized) {
      state = getValue.call(this);
      JSIL.Host.runLater(cleanup);
    }

    return state;
  }