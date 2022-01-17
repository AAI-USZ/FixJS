function(err) {
                console.warn('body fetch error', err);
                if (--pendingFetches === 0)
                  callbacks.newMsgs();
              }