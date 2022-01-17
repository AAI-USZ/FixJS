function mayBeObjectID(str) {
  return str && typeof str === "string" && str.length === 24;
}