function cutAngle(angle) {
	if(angle < 0)
		angle += Math.PI*2;
	angle = angle - Math.floor(angle/(Math.PI*2))*(Math.PI*2);
	return angle;
}