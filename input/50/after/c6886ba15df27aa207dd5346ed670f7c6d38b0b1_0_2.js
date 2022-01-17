function() {
      test.assertEqual(windowUtils.activeWindow, testRunnerWindow,
                       "Correct active window [2]");
      test.assertEqual(windowUtils.activeBrowserWindow, browserWindow,
                       "Correct active browser window [3]");
      continueAfterFocus(windowUtils.activeWindow = browserWindow);
    }