function(data){
    var target = data.target;
    // unbind all events
    target.unbind('.spritespin');
  
    // use custom or build in behavior
    var currentBehavior = data.behavior;
    if (typeof(data.behavior) === "string"){
      currentBehavior = Spin.behaviors[data.behavior];
    }
    
    var prevent = function(e){
      if (e.cancelable){
        e.preventDefault();
      }
      return false;
    };
    
    // rebind interaction events
    target.bind('mousedown.spritespin',  currentBehavior.mousedown);
    target.bind('mousemove.spritespin',  currentBehavior.mousemove);
    target.bind('mouseup.spritespin',    currentBehavior.mouseup);
    target.bind('mouseenter.spritespin', currentBehavior.mouseenter);
    target.bind('mouseover.spritespin',  currentBehavior.mouseover);
    target.bind('mouseleave.spritespin', currentBehavior.mouseleave);
    target.bind('dblclick.spritespin',   currentBehavior.dblclick);
    target.bind('onFrame.spritespin',    currentBehavior.onFrame);
  
    if (data.touchable){
      target.bind('touchstart.spritespin',  currentBehavior.mousedown);
      target.bind('touchmove.spritespin',   currentBehavior.mousemove);
      target.bind('touchend.spritespin',    currentBehavior.mouseup); 
      target.bind('touchcancel.spritespin', currentBehavior.mouseleave);
      target.bind('click.spritespin',         prevent); 
      target.bind('gesturestart.spritespin',  prevent); 
      target.bind('gesturechange.spritespin', prevent); 
      target.bind('gestureend.spritespin',    prevent); 
    }
            
    // disable selection
	  target.bind("mousedown.spritespin selectstart.spritespin", prevent);
	  
	  target.bind("onFrame.spritespin", function(event, data){
	    Spin.draw(data);
	  });
	  
	  // bind custom events
	  if (typeof(data.onFrame) === "function"){
	    target.bind("onFrame.spritespin", data.onFrame);
	  }
	  if (typeof(data.onLoad) === "function"){
	    target.bind("onLoad.spritespin", data.onLoad);
	  }
  }