function() {
    // Pick an index that's not the first one of anything...
    var index = 5,
        synMessage = msearchView.testFolder.messages[index];
    eSync.expect_namedValue(
      'bodyInfo',
      {
        to: synMessage.bodyInfo.to,
        bodyText: synMessage.bodyInfo.bodyRep,
      });

    var header = msearchView.slice.items[index];
    header.getBody(function(bodyInfo) {
      eSync.namedValue(
        'bodyInfo',
        bodyInfo && {
          to: bodyInfo.to,
          bodyText: bodyInfo.bodyRep,
        });
    });
  }