function(threadFound, callback) {
                    test.equals(threadFound.msgText, thread.msgText);
                    callback();
                }