function(threadFound, callback) {
                    console.log(threadFound);
                    test.equals(threadFound.msgText, thread.msgText);
                    test.equals(threadFound.parents.length, 0);
                    callback();
                }