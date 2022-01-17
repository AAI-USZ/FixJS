function( inSender, inEvent ) {
    var url = this.$.spaces.directoryData[inEvent.index];
    var space = this.$.spaces.spaceStatuses[url];

    try {
      if( space.open ) {
        inSender.$.icon.setSrc( space.icon.open );
      } else {
        inSender.$.icon.setSrc( space.icon.closed );
      }

    } catch(e) {
      inSender.$.icon.setSrc( space.logo );
    }

    try {
      inSender.$.spaceName.setContent( space.space );
    } catch(e) {
      inSender.$.spaceName.setContent( "Somewhere Over t3h Rainbow" );
    }

  }