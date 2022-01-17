function createObstacles() {
	obstacles = [];
	obstacles.push(createBox(0,0,5,CANVAS_HEIGHT));
	obstacles.push(createBox(CANVAS_WIDTH-5,0,5,CANVAS_HEIGHT));
	obstacles.push(createBox(0,0,CANVAS_WIDTH,5));
	obstacles.push(createBox(0,CANVAS_HEIGHT-5,CANVAS_WIDTH,5));
	
	obstacles.push(createPolygon([{x:5,y:188},{x:31,y:196},{x:37,y:292},{x:39,y:378},{x:26,y:410},
		{x:5,y:415}])); 
	obstacles.push(createPolygon([{x:158,y:5},{x:164,y:41},{x:187,y:57},{x:237,y:62},{x:325,y:56},
		{x:355,y:27},{x:355,y:5}]));
	obstacles.push(createPolygon([{x:535,y:144},{x:498,y:174},{x:490,y:321},{x:511,y:452},
		{x:535,y:467}]));
	obstacles.push(createPolygon([{x:5,y:551},{x:43,y:550},{x:82,y:584},{x:81,y:637},{x:5,y:637}]));
	obstacles.push(createPolygon([{x:538,y:541},{x:492,y:540},{x:444,y:562},{x:401,y:592},
		{x:375,y:637},{x:537,y:637}]));
	
	obstacles.push(createPolygon([{x:206,y:248},{x:296,y:244},{x:388,y:225},{x:362,y:153},
		{x:266,y:147},{x:161,y:158},{x:136,y:206},{x:153,y:232}]));
	obstacles.push(createPolygon([{x:180,y:340},{x:119,y:331},{x:114,y:365},{x:122,y:444},
		{x:164,y:504},{x:203,y:504},{x:233,y:486},{x:228,y:414}]));
	obstacles.push(createPolygon([{x:383,y:351},{x:339,y:358},{x:287,y:377},{x:288,y:459},
		{x:314,y:510},{x:362,y:513},{x:390,y:454}]));
}