function() {
      console.log("guide model initialize");
      var mavlink = this.get('mavlinkSrc');
      this.metaWaypointModel = mavlink.subscribe(
        'META_WAYPOINT', this.onMetaWaypointChange, this);
    }