function testLowLevel() {

  // existence of chrome.devtools.remoteDebug tested in 
  // chrome/src/chrome/test/data/devtools/extensions/devtools_extension/devtools.js

  console.log("Testing Low-level API: chrome.devtools.remoteDebug");

  var domainListener = {
    loadEventFired: function(timestamp) {
      if (typeof timestamp === 'number') {
        console.log('PASS low-level event');
      } else {
        console.error('FAIL wrong argument to loadEventFired');
      }
      chrome.devtools.remoteDebug.removeDomainListener('Page', domainListener);
      testHighLevel();
    }
  };

  chrome.devtools.remoteDebug.registerEvent('Page.loadEventFired', ['timestamp']);
  chrome.devtools.remoteDebug.addDomainListener('Page', domainListener);
  
  chrome.devtools.remoteDebug.sendCommand('Page.reload', {}, function(result) {
      console.log('PASS low-level sendCommand');
  });

}