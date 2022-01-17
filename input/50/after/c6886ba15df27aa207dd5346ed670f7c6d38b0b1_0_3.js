function() {
      test.assertEqual(windowUtils.activeWindow, browserWindow,
                       "Correct active window [4]");
      continueAfterFocus(windowUtils.activeWindow = testRunnerWindow);
    }