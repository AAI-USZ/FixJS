function()
{
  var mediator = Components.classes['@mozilla.org/appshell/window-mediator;1']
              .getService(Components.interfaces.nsIWindowMediator);      
  var window = mediator.getMostRecentWindow("navigator:browser");
  if (!window)
    window=mediator.getMostRecentWindow("mail:3pane");
  if (!window)
    window=mediator.getMostRecentWindow("calendarMainWindow");
  if (!window)
    window=mediator.getMostRecentWindow("Songbird:Main");
  if (window)
    paneTitle.nightly=window.nightly;

  paneTitle.toggled();

  paneTitle.bundle=document.getElementById("variablesBundle");
  
  paneTitle.addVariable("DefaultTitle");
  paneTitle.addVariable("AppID");
  paneTitle.addVariable("Vendor");
  paneTitle.addVariable("Name");
  paneTitle.addVariable("Version");
  paneTitle.addVariable("AppBuildID");
  paneTitle.addVariable("PlatformBuildID");
  paneTitle.addVariable("PlatformVersion");
  paneTitle.addVariable("GeckoVersion");
  paneTitle.addVariable("BrandName");
  paneTitle.addVariable("UserAgent");
  paneTitle.addVariable("Locale");
  paneTitle.addVariable("OS");
  paneTitle.addVariable("Processor");
  paneTitle.addVariable("Compiler");
  paneTitle.addVariable("Toolkit");
  paneTitle.addVariable("Profile");
}