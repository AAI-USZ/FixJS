function(e) {
    return {
      myValue: true,
      touches: [{
        identifier : 1,
        target: lowland.bom.Events.getTarget(e),
        pageX : e.screenX,
        pageY : e.screenY
      }],
      scale: 1.0
    };
  }