function() {
                    geo.getCurrentPosition(s, e, {timeout:50});

                    // Call the success callback to "fake" the native framework returning a (empty) position object.
                    // This should also disable the timeout timer.
                    exec.mostRecentCall.args[0]({});
                }