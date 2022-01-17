function( inSender, inEvent ) {
    var url = this.$.spaces.directoryData[inEvent.index];
    var space = this.$.spaces.spaceStatuses[url];

    try {
      if( space.open ) {
        inSender.$.item.addClass( "openSpace" );
        inSender.$.item.removeClass( "closedSpace" );
        inSender.$.icon.setSrc( space.icon.open );
      } else {
        inSender.$.item.addClass("closedSpace");
        inSender.$.item.removeClass( "openSpace" );
        inSender.$.icon.setSrc( space.icon.closed );
      }
    } catch(e) {
      inSender.$.icon.setSrc( space.logo );
    }

    inSender.$.spaceName.setContent( space.space );

    inSender.$.item.space = space;
  }