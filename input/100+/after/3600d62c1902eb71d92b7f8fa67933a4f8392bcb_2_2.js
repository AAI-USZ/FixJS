function(T) {
  // -- pieces
  // - bodies: text/plain
  var bpartStraightASCII =
        new SyntheticPartLeaf("I am text! Woo!"),
      bpartUtf8Name =
        new SyntheticPartLeaf(
          utf8UnicodeName,
          { charset: 'utf-8', format: null, encoding: '8bit' }),
      bpartQpUtf8Name =
        new SyntheticPartLeaf(
          qpUtf8UnicodeName,
          { charset: 'utf-8', format: null, encoding: 'quoted-printable' }),
      // Body text that contains a mime word that should *not* be decoded.
      bpartMimeWord =
        new SyntheticPartLeaf(
          mwqSammySnake,
          { charset: 'utf-8', format: null, encoding: null }),
  // - bodies: text/html
      bpartIgnoredHtml =
        new SyntheticPartLeaf(
          "<html><head></head><body>I am HTML! Woo! </body></html>",
          { contentType: 'text/html' }),

  // - multipart/alternative
  // NB: currently we ignore HTML body parts!
      alternStraight =
        new SyntheticPartMultiAlternative(
          [bpartStraightASCII, bpartIgnoredHtml]),
      alternUtf8Name =
        new SyntheticPartMultiAlternative(
          [bpartUtf8Name, bpartIgnoredHtml]),
      alternQpUtf8Name =
        new SyntheticPartMultiAlternative(
          [bpartQpUtf8Name, bpartIgnoredHtml]);

  // -- full definitions and expectations
  var testMessages = [
    // - straight up verification we don't do mime-word decoding on bodies
    {
      name: 'simple text/plain with mimeword in the body',
      bodyPart: bpartMimeWord,
      // the body should not get decoded; it should still be the mime-word
      checkBody: mwqSammySnake,
    },
    // - alternatives that test proper encoding
    {
      name: 'multipart/alternative simple',
      bodyPart: alternStraight,
      checkBody: "I am text! Woo!",
    },
    {
      name: 'multipart/alternative utf8',
      bodyPart: alternUtf8Name,
      checkBody: rawUnicodeName,
    },
    {
      name: 'multipart/alternative qp utf8',
      bodyPart: alternQpUtf8Name,
      checkBody: rawUnicodeName,
    },
  ];

  T.group('setup');
  var testUniverse = T.actor('testUniverse', 'U'),
      testAccount = T.actor('testImapAccount', 'A',
                            { universe: testUniverse, restored: true }),
      eCheck = T.lazyLogger('messageCheck');

  // -- create the folder, append the messages
  var fullSyncFolder = testAccount.do_createTestFolder(
    'test_mime_hier', function makeMessages() {
    var messageAppends = [], msgGen = new MessageGenerator();

    for (var i = 0; i < testMessages.length; i++) {
      var msgDef = testMessages[i];
      msgDef.age = { days: 1, hours: i };
      var synMsg = msgGen.makeMessage(msgDef);
      messageAppends.push({
        date: synMsg.date,
        headerInfo: {
          subject: synMsg.subject,
        },
        messageText: synMsg.toMessageString(),
      });
    }

    return messageAppends;
  });
  // -- open the folder
  var folderView = testAccount.do_openFolderView(
    'syncs', fullSyncFolder,
    { count: testMessages.length, full: testMessages.length, flags: 0,
      deleted: 0 },
    { top: true, bottom: true, grow: false });
  // -- check each message in its own step
  testMessages.forEach(function checkMessage(msgDef, iMsg) {
    T.check(eCheck, msgDef.name, function() {
      eCheck.expect_namedValue('body', msgDef.checkBody);
      if ('attachments' in msgDef) {
        for (var i = 0; i < msgDef.attachments.length; i++) {
          eCheck.expect_namedValue('attachment', msgDef.attachments._filename);
        }
      }

      folderView.slice.items[iMsg].getBody(function(body) {
        eCheck.namedValue('body', body.bodyRep[1]);
        if (body.attachments && body.attachments.length) {
          for (var i = 0; i < body.attachments.length; i++) {
            eCheck.expect_namedValue('attachment',
                                     body.attachments[i].filename);
          }
        }
      });
    });
  });

  T.group('cleanup');
}