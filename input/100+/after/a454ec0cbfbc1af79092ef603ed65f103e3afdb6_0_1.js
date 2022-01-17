function (target, key, getDefault) {
  var state = $jsilcore.PropertyNotInitialized;

  var getter = function () {
    if (state === $jsilcore.PropertyNotInitialized)
      state = getDefault.call(this);

    return state;
  };

  var setter = function (value) {
    Object.defineProperty(
      this, key, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: value
      } 
    );

    return value;
  };

  var descriptor = {
    configurable: true,
    enumerable: true,
    get: getter,
    set: setter
  };

  Object.defineProperty(target, key, descriptor);
}