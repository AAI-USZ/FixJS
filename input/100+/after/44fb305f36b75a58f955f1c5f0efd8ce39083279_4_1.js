function testLowLevel() {

  // existence of chrome.experimental.devtools.remoteDebug tested in 
  // chrome/src/chrome/test/data/devtools/extensions/devtools_extension/devtools.js

  console.log("Testing Low-level API: chrome.experimental.devtools.remoteDebug");

  var domainListener = {
    loadEventFired: function(timestamp) {
      if (typeof timestamp === 'number') {
        console.log('PASS low-level event');
      } else {
        console.error('FAIL wrong argument to loadEventFired');
      }
      chrome.experimental.devtools.remoteDebug.removeDomainListener('Page', domainListener);
      testHighLevel();
    }
  };

  chrome.experimental.devtools.remoteDebug.registerEvent('Page.loadEventFired', ['timestamp']);
  chrome.experimental.devtools.remoteDebug.addDomainListener('Page', domainListener);
  
  chrome.experimental.devtools.remoteDebug.sendCommand('Page.reload', {}, function(result) {
      console.log('PASS low-level sendCommand');
  });

}