function drawDistSensor(g2, state) {
	var cpoint = state.getPoints()[1];
	g2.lineWidth = 1;
	g2.strokeStyle = "purple";
	
	g2.beginPath();
	
	if (pf_state != 0) {
		g2.moveTo(cpoint[0], cpoint[1]);
		g2.lineTo(state.distSensor[1].p.x, state.distSensor[1].p.y);
	} else {
		for(var i = 0; i < 3; i+=2) {
			g2.moveTo(cpoint[0], cpoint[1]);
			g2.lineTo(state.distSensor[i].p.x, state.distSensor[i].p.y);
		}
	}
	
	g2.closePath();
	g2.stroke();
}