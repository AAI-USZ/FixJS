function test()
{
  waitForExplicitFinish();
  removePermission(testPageURL, "indexedDB");
  executeSoon(test1);
}