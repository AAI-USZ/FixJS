function( inSender ) {
    enyo.log(this.$.spaces.spaceStatuses);

    this.$.dataScroller.setCount( inSender.spaceCount);
    this.$.dataScroller.reset();
  }