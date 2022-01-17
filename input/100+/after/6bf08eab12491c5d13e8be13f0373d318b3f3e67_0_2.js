function canInvoke(obj, methodName) {
  return !!(obj && typeof obj[methodName] === 'function');
}