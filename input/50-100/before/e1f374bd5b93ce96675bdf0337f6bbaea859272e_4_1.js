function(timestamp) {
      if (typeof timestamp === 'number') {
        console.log('PASS low-level event');
      } else {
        console.error('FAIL wrong argument to loadEventFired');
      }
      chrome.devtools.remoteDebug.removeDomainListener('Page', domainListener);
      testHighLevel();
    }