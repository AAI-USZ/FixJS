function(test) {
  test.waitUntilDone(5000);

  let testRunnerWindow = Cc["@mozilla.org/appshell/window-mediator;1"]
                         .getService(Ci.nsIWindowMediator)
                         .getMostRecentWindow("test:runner");
  let browserWindow =  Cc["@mozilla.org/appshell/window-mediator;1"]
                      .getService(Ci.nsIWindowMediator)
                      .getMostRecentWindow("navigator:browser");

  test.assertEqual(windowUtils.activeBrowserWindow, browserWindow,
                    "Browser window is the active browser window.");


  let testSteps = [
    function() {
      windowUtils.activeWindow = browserWindow;
      continueAfterFocus(browserWindow);
    },
    function() {
      test.assertEqual(windowUtils.activeWindow, browserWindow,
                       "Correct active window [1]");
      continueAfterFocus(windowUtils.activeWindow = testRunnerWindow);
    },
    function() {
      test.assertEqual(windowUtils.activeWindow, testRunnerWindow,
                       "Correct active window [2]");
      test.assertEqual(windowUtils.activeBrowserWindow, browserWindow,
                       "Correct active browser window [3]");
      continueAfterFocus(windowUtils.activeWindow = browserWindow);
    },
    function() {
      test.assertEqual(windowUtils.activeWindow, browserWindow,
                       "Correct active window [4]");
      continueAfterFocus(windowUtils.activeWindow = testRunnerWindow);
    },
    function() {
      test.assertEqual(windowUtils.activeWindow, testRunnerWindow,
                       "Correct active window [5]");
      test.assertEqual(windowUtils.activeBrowserWindow, browserWindow,
                       "Correct active browser window [6]");
      testRunnerWindow = null;
      browserWindow = null;
      test.done()
    }
  ];

  let nextTest = function() {
    let func = testSteps.shift();
    if (func) {
      func();
    }
  }

  function continueAfterFocus(targetWindow) {

    // Based on SimpleTest.waitForFocus
    var fm = Cc["@mozilla.org/focus-manager;1"].
             getService(Ci.nsIFocusManager);

    var childTargetWindow = {};
    fm.getFocusedElementForWindow(targetWindow, true, childTargetWindow);
    childTargetWindow = childTargetWindow.value;

    var focusedChildWindow = {};
    if (fm.activeWindow) {
      fm.getFocusedElementForWindow(fm.activeWindow, true, focusedChildWindow);
      focusedChildWindow = focusedChildWindow.value;
    }

    var focused = (focusedChildWindow == childTargetWindow);
    if (focused) {
      nextTest();
    } else {
      childTargetWindow.addEventListener("focus", function focusListener() {
        childTargetWindow.removeEventListener("focus", focusListener, true);
        nextTest();
      }, true);
    }

  }

  nextTest();
}