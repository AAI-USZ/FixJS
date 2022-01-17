function() {
    var position  = Elm.Input(Value.Tuple(0,0));
    var isDown    = Elm.Input(false);
    var isClicked = Elm.Input(false);
    var clicks = Elm.Input(Value.Tuple());
    
    function getXY(e) {
      var posx = 0;
      var posy = 0;
      if (!e) var e = window.event;
      if (e.pageX || e.pageY) {
	posx = e.pageX;
	posy = e.pageY;
      } else if (e.clientX || e.clientY) 	{
	posx = e.clientX + document.body.scrollLeft +
	    document.documentElement.scrollLeft;
	posy = e.clientY + document.body.scrollTop +
	    document.documentElement.scrollTop;
      }
      return Value.Tuple(posx, posy);
    }

    addListener(document, 'click', function(e) {
	    Dispatcher.notify(isClicked.id, true);
	    Dispatcher.notify(clicks.id, Value.Tuple());
	    Dispatcher.notify(isClicked.id, false);
	});
    addListener(document, 'mousedown', function(e) {
	    Dispatcher.notify(isDown.id, true); });
    addListener(document, 'mouseup', function(e) {
	    Dispatcher.notify(isDown.id, false); });
    addListener(document, 'mousemove', function(e) {
	    Dispatcher.notify(position.id, getXY(e)); });
    var clickedOn = function(elem) {
	var click = Elm.Input(false);
	addListener(elem, 'click', function(e) {
		Dispatcher.notify(click.id, true);
		Dispatcher.notify(click.id, false);
	    });
	return Value.Tuple(elem, click);
    };
    return {position: position,
	    x: Elm.Lift(function(p){return p[1];},[position]),
	    y: Elm.Lift(function(p){return p[2];},[position]),
	    isClicked: isClicked,
	    isDown: isDown,
	    clicks: clicks
	    //clickedOn: clickedOn
	    };
  }