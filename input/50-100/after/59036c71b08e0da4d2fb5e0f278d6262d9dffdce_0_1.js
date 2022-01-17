function () {
        if (typeof window.callPhantom !== 'function') {
          window.callPhantom = function () {
            // Fixing that phantom 1.5 does not have onCallback
            console.log('####[oncallback]####' + JSON.stringify(Array.prototype.slice.call(arguments)));
          };
        }
        window.underTest = true;
      }