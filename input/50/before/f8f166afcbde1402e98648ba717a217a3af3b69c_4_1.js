function(bodyInfo) {
      eSync.namedValue(
        'bodyInfo',
        bodyInfo && {
          to: bodyInfo.to,
          bodyText: bodyInfo.bodyRep[1],
        });
    }