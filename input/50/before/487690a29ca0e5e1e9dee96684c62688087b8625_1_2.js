function test3()
{
  // Remove database from domain 2
  Components.classes["@mozilla.org/privatebrowsing;1"]
            .getService(Components.interfaces.nsIPrivateBrowsingService)
            .removeDataFromDomain(domains[1]);
  setPermission(testPageURL4, "indexedDB", "unknown");
  executeSoon(test4);
}