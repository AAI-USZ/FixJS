function(side, top, bottom, left, right){
	var score = 0;
	var color = side[1][1];
	var color_top = top[1][1];
	var color_bottom = bottom[1][1];
	var color_left = left[1][1];
	var color_right = right[1][1];
	if (side[0][0] === color && top[2][0] === color_top && left[0][2] === color_left)
		score += 1;
	if (side[0][1] === color && top[2][1] === color_top)
		score += 1;
	if (side[0][2] === color && top[2][2] === color_top && right[0][0] === color_right)
		score += 1;
	if (side[1][0] === color && left[1][2] == color_left)
		score += 1;
	if (side[1][2] === color && right[1][0] === color_right)
		score += 1;
	if (side[2][0] === color && bottom[0][0] == color_bottom && left[2][2] === color_left)
		score += 1;
	if (side[2][1] === color && bottom[0][1] === color_bottom)
		score += 1;
	if (side[2][2] === color && bottom[0][2] === color_bottom && right[2][0] === color_right)
		score += 1;
	return score;
}