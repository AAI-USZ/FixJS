function( inSender ) {
    enyo.log(this.$.spaces.spaceStatuses);

    this.$.loadingScrim.addStyles("display: none");

    this.$.dataScroller.setCount( inSender.spaceCount);
    this.$.dataScroller.reset();
  }