function() {
      test.assertEqual(windowUtils.activeWindow, browserWindow,
                       "Correct active window [4]");
      windowUtils.activeWindow = testRunnerWindow;
      continueAfterFocus(testRunnerWindow);
    }