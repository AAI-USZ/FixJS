function(bodyPart) {
              var opts = { request: { body: bodyPart.partID } };
              pendingFetches++;

console.log('  fetching for', chewRep.msg.id, bodyPart.partID);
              var fetcher;
try {
              fetcher = conn.fetch(chewRep.msg.id, opts);
} catch (ex) {
  console.warn('!failure fetching', ex);
  return;
}
              setupBodyParser(bodyPart);
              fetcher.on('error', function(err) {
                console.warn('body fetch error', err);
                if (--pendingFetches === 0)
                  callbacks.newMsgs();
              });
              fetcher.on('message', function(msg) {
                setupBodyParser(bodyPart);
                msg.on('data', bodyParseBuffer);
                msg.on('end', function() {
console.log('  !fetched body part for', chewRep.msg.id, bodyPart.partID);
                  partsReceived.push(finishBodyParsing());

                  // -- Process
                  if (partsReceived.length === chewRep.bodyParts.length) {
                    if ($imapchew.chewBodyParts(chewRep, partsReceived,
                                                storage.folderId)) {
                      storage.addMessageHeader(chewRep.header);
                      storage.addMessageBody(chewRep.header, chewRep.bodyInfo);
                    }
                  }
                  // If this is the last chew rep, then use its completion
                  // to report our completion.
                  if (--pendingFetches === 0)
                    callbacks.newMsgs();
                });
              });
            }