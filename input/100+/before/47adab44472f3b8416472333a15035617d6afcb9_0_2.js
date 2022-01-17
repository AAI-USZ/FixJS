function(side){
	var score = 0;
	var color = side[1][1];
	if (side[0][0] === color)
		score += 1;
	if (side[0][1] === color)
		score += 1;
	if (side[0][2] === color)
		score += 1;
	if (side[1][0] === color)
		score += 1;
	if (side[1][2] === color)
		score += 1;
	if (side[2][0] === color)
		score += 1;
	if (side[2][1] === color)
		score += 1;
	if (side[2][2] === color)
		score += 1;
	return score;
}