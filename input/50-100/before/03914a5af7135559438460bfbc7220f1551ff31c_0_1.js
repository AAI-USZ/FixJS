function TorBirdy() {

  this.wrappedJSObject = this;
  this.prefs = Cc["@mozilla.org/preferences-service;1"]
                  .getService(Ci.nsIPrefBranch);

  this.acctMgr = Cc["@mozilla.org/messenger/account-manager;1"]
                  .getService(Ci.nsIMsgAccountManager);

  this.setPrefs();
  this.setAccountPrefs();

  dump("TorBirdy registered!\n");
  
}