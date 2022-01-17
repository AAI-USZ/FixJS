function() {
                  partsReceived.push(finishBodyParsing());

                  // -- Process
                  if (partsReceived.length === chewRep.bodyParts.length) {
                    if ($imapchew.chewBodyParts(chewRep, partsReceived,
                                                storage.folderId)) {
                      storage.addMessageHeader(chewRep.header);
                      storage.addMessageBody(chewRep.header, chewRep.bodyInfo);
                    }
                   // If this is the last chew rep, then use its completion
                   // to report our completion.
                    if (--pendingFetches === 0)
                      callbacks.newMsgs();
                  }
                }