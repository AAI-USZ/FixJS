function() {
      test.assertEqual(windowUtils.activeWindow, browserWindow,
                       "Correct active window [1]");
      continueAfterFocus(windowUtils.activeWindow = testRunnerWindow);
    }