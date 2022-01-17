function invokeAction(action, params, sender) {
  var method = action.method, target = action.target;
  // If there is no target, the target is the object
  // on which the event was fired.
  if (!target) { target = sender; }
  if ('string' === typeof method) { method = target[method]; }
  method.apply(target, params);
}