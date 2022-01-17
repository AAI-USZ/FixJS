function() {
              gDebugger.gClient.addOneTimeListener("resumed", function() {
                finalCheck();
                closeDebuggerAndFinish();
              });
              gDebugger.DebuggerController.activeThread.resume();
            }