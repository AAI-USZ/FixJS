function (target, key, getValue) {
  var state = $jsilcore.PropertyNotInitialized;

  var cleanup = function () {
    JSIL.SetValueProperty(target, key, state);
  };

  var getter = function () {
    if (state === $jsilcore.PropertyNotInitialized) {
      state = getValue();
      JSIL.Host.runLater(cleanup);
    }

    return state;
  };

  var descriptor = {
    configurable: true,
    enumerable: true,
    get: getter
  };

  Object.defineProperty(target, key, descriptor);
}