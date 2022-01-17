function (callback) {
      webPage.onCallback = function () {
        callback.call(this);
      };
      webPage.evaluate(function () {
        window.startApp();
        setTimeout(function () {
          callPhantom.call(this);
        }, 700);
      });
    }