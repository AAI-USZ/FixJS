function setupModule(module) {
  let fdh = collector.getModule('folder-display-helpers');
  fdh.installInto(module);
  let wh = collector.getModule('window-helpers');
  wh.installInto(module);
  let dh = collector.getModule("dom-helpers");
  dh.installInto(module);
  let pwh = collector.getModule('pref-window-helpers');
  pwh.installInto(module);
  let rh = collector.getModule('replymanager-helpers');
  rh.installInto(module);
  
  //enable Gloda for the test set
  let checkGloda = function(ac) {
    let checkbox = ac.eid("enableGloda");
    ac.check(checkbox, true);
  };
  open_pref_window("paneAdvanced", checkGloda);
  let prefBranch = Components.classes["@mozilla.org/preferences-service;1"]
                             .getService(Components.interfaces.nsIPrefBranch);
  let glodaEnabled = prefBranch.getBoolPref("mailnews.database.global.indexer.enabled");
  prefBranch.setBoolPref("mailnews.database.global.logging.console", true);
  
  folder = create_folder("reply-manager-test-folder");
  
  /* We'll mainly change this message to test the header pane elements*/
  gTestMessage = create_message({
    subject: "People never reply to this email.",
    from:["Len", "len@somewhere.com"],
    to:[["Miku", "miku@somewhere.com"]],
    toCount: 1,
  });
  
  /* This message will be changed while the first message is being
   * displayed.*/
  let message2 = create_message({
    subject: "This will be changed",
    to:[["Luka", "luka@somewhere.com"]],
    toCount: 1,
  });
  
  add_message_to_folder(folder, gTestMessage);
  add_message_to_folder(folder, message2);
}