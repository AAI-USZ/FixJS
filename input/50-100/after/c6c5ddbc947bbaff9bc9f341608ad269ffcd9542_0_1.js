function(e) {
    return {
      myValue: true,
      touches: [{
        identifier : 1,
        target: lowland.bom.Events.getTarget(e),
        screenX: e.screenX,
        screenY: e.screenY,
        pageX : e.pageX,
        pageY : e.pageY
      }],
      scale: 1.0
    };
  }