function alert(message)
{
  Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
    .getService(Components.interfaces.nsIPromptService)
    .alert(null, "test", String(message));
}