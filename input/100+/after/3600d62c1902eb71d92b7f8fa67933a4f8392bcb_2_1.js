function(T) {
  T.group('setup');
  var testUniverse = T.actor('testUniverse', 'U'),
      testAccount = T.actor('testImapAccount', 'A', { universe: testUniverse }),
      eBodies = T.lazyLogger('bodies');

  var fullSyncFolder = testAccount.do_createTestFolder(
    'test_mime_encodings',
    { count: 2, age: { days: 0 }, age_incr: { days: 1 },
      // replace the actual encoding with these values...
      replaceHeaders: [
        { 'Content-Transfer-Encoding': 'quoted-printable' },
        { 'Content-Transfer-Encoding': 'base64' },
      ],
      rawBodies: [
        qpTruthBeauty,
        b64TruthBeauty
      ]
    });
  var folderView = testAccount.do_openFolderView(
    'syncs', fullSyncFolder,
    { count: 2, full: 2, flags: 0, deleted: 0 },
    { top: true, bottom: true, grow: false });
  T.check('check message', eBodies, function() {
    eBodies.expect_namedValue('qp', rawTruthBeauty);
    eBodies.expect_namedValue('b64', rawTruthBeauty);

    var qpHeader = folderView.slice.items[0],
        b64Header = folderView.slice.items[1];
    qpHeader.getBody(function(qpBody) {
      eBodies.namedValue('qp', qpBody.bodyRep[1]);
    });
    b64Header.getBody(function(b64Body) {
      eBodies.namedValue('b64', b64Body.bodyRep[1]);
    });
  });

  T.group('cleanup');
}