function(controller, message) {
  var messageElements = message.name.split(":");
  var actionElements = messageElements[0].split(".");
  var actionClassName = actionElements[0];
  var actionName = actionElements[1] ? actionElements[1] : "";
  if (message.id) {
    this.actionClass = controller.actionClasses[actionClassName];
  } else {
    this.actionClass = controller.clientActionClasses[actionClassName];
  }

  if (this.actionClass == undefined) {
    var errorMsg = "[ERROR] Cannot find a client action class \"" + actionClassName + "\"";
    Bristleback.Console.log(errorMsg);
    throw new Error(errorMsg);
  }

  this.action = this.actionClass.actions[actionName];
  if (this.action == undefined) {
    errorMsg = "[ERROR] Cannot find action " + (actionName ? "\"" + actionName + "\"" : "default action ") + " in action class \"" + this.name + "\"";
    Bristleback.Console.log(errorMsg);
    throw new Error(errorMsg);
  }

  this.callback = controller.callbacks[message.id];
  this.content = message.payload;
  this.exceptionType = messageElements.length > 0 ? this.content.type : undefined;
}