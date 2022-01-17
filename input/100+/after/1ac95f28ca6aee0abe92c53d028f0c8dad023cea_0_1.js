function (event) {
      console.log(event);
      console.log("You clicked!");
      draw_circle(event.layerX, event.layerY);
      Circles.insert({
	          graph_id: Session.get('graph_id'),
	          cx: event.layerX,
	          cy: event.layerY }) ;
    }