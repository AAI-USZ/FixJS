function onNewFetchEnd() {
          // sort the messages, endTS to startTS (aka numerically descending)
          newChewReps.sort(function(a, b) {
              return b.msg.date - a.msg.date;
            });

          // - issue the bodypart fetches.
          // Use mailparser's body parsing capabilities, albeit not entirely in
          // the way it was intended to be used since it wants to parse full
          // messages.
          var mparser = new $mailparser.MailParser();
          function setupBodyParser(partDef) {
            mparser._state = 0x2; // body
            mparser._remainder = '';
            mparser._currentNode = null;
            mparser._currentNode = mparser._createMimeNode(null);
            // nb: mparser._multipartTree is an empty list (always)
            mparser._currentNode.meta.contentType =
              partDef.type.toLowerCase() + '/' +
              partDef.subtype.toLowerCase();
            mparser._currentNode.meta.charset =
              partDef.params && partDef.params.charset &&
              partDef.params.charset.toLowerCase();
            mparser._currentNode.meta.transferEncoding =
              partDef.encoding && partDef.encoding.toLowerCase();
            mparser._currentNode.meta.textFormat =
              partDef.params && partDef.params.format &&
              partDef.params.format.toLowerCase();
          }
          function bodyParseBuffer(buffer) {
            process.immediate = true;
            mparser.write(buffer);
            process.immediate = false;
          }
          function finishBodyParsing() {
            process.immediate = true;
            mparser._process(true);
            process.immediate = false;
            // We end up having provided an extra newline that we don't
            // want, so let's cut it off if it exists.
            var content = mparser._currentNode.content;
            if (content.charCodeAt(content.length - 1) === 10)
              content = content.substring(0, content.length - 1);
            return content;
          }

          // XXX imap.js is currently not capable of issuing/parsing multiple
          // literal results from a single fetch result line.  It's not a
          // fundamentally hard problem, but I'd rather defer messing with its
          // parse loop (and internal state tracking) until a future time when
          // I can do some other cleanup at the same time.  (The subsequent
          // literals are just on their own lines with an initial space and then
          // the named literal.  Ex: " BODY[1.2] {2463}".)
          //
          // So let's issue one fetch per body part and then be happy when we've
          // got them all.
          var pendingFetches = 0;
          newChewReps.forEach(function(chewRep, iChewRep) {
            var partsReceived = [];
            // If there are no parts to process, consume it now.
            if (chewRep.bodyParts.length === 0) {
              if ($imapchew.chewBodyParts(chewRep, partsReceived,
                                          storage.folderId)) {
                storage.addMessageHeader(chewRep.header);
                storage.addMessageBody(chewRep.header, chewRep.bodyInfo);
              }
            }

            chewRep.bodyParts.forEach(function(bodyPart) {
              var opts = { request: { body: bodyPart.partID } };
              pendingFetches++;

              var fetcher = conn.fetch(chewRep.msg.id, opts);
              setupBodyParser(bodyPart);
              fetcher.on('message', function(msg) {
                setupBodyParser(bodyPart);
                msg.on('data', bodyParseBuffer);
                msg.on('end', function() {
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
                });
              });
            });
          });
          if (pendingFetches === 0)
            callbacks.newMsgs();
        }