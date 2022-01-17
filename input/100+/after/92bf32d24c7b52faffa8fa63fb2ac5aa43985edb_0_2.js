function install(data, reason) 
{
  try {
  } catch (e) {
    message = e.fileName + ":" + e.lineNumber + " " + e.toString();
    Components.reportError(message);
    return false;
  }
  return true;
}