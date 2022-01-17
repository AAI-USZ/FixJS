function (value) {
  if (value === null)
    return false;
  else if (Array.isArray(value))
    return true;

  if (typeof (value) === "object") {
    var valueProto = Object.getPrototypeOf(value);
    var isArrayBuffer = false;

    if (typeof (ArrayBuffer) === "function") {
      isArrayBuffer = ((typeof (value.buffer) === "object") && (Object.getPrototypeOf(value.buffer) === ArrayBuffer.prototype));
    }

    if (isArrayBuffer)
      return true;
  }

  return false;
}