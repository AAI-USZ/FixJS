function test()
{
  waitForExplicitFinish();
  requestLongerTimeout(10);
  removePermission(testPageURL, "indexedDB-unlimited");
  Services.prefs.setIntPref("dom.indexedDB.warningQuota", 2);
  executeSoon(test1);
}