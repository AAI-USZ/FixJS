function() {
      test.assertEqual(windowUtils.activeWindow, browserWindow,
                       "Correct active window [1]");
      windowUtils.activeWindow = testRunnerWindow;
      continueAfterFocus(testRunnerWindow);
    }