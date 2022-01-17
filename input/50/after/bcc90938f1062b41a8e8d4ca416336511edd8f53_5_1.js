function test()
{
  waitForExplicitFinish();
  requestLongerTimeout(10);
  setPermission(testPageURL, "indexedDB");
  removePermission(testPageURL, "indexedDB-unlimited");
  Services.prefs.setIntPref("dom.indexedDB.warningQuota", 2);
  executeSoon(test1);
}