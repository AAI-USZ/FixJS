function invokeAction(action, params, sender) {
  var method = action.method, target = action.target;
  // If there is no target, the target is the object
  // on which the event was fired.
  if (!target) { target = sender; }
  if ('string' === typeof method) { method = target[method]; }
  if (params) {
    method.apply(target, params);
  } else {
    method.apply(target);
  }
}