function draw_dice()
{
	//get device width and set canvas size as device width
	canvas_width  = document.documentElement.clientWidth -20 ;//get device width
	canvas_height = canvas_width;// get device height

	//set canvas size
	$("#dice_canvas").attr("width",canvas_width);
	$("#dice_canvas").attr("height",canvas_height);
	
	//calculate square size and distance between squares
	var side = 0 ;
	if(canvas_width > canvas_height)
		side = canvas_height ;
	else
		side = canvas_width ;
	
	square_distance = side / 10 ;
	square_side_length = side / 2 - square_distance ; 
	dot_radius = square_side_length / 9 ;
	
	//calculate coordinate X and Y of canvas middle point
	canvas_mid_pos_y = canvas_width / 2 ;
	canvas_mid_pos_x = canvas_height / 2 ;
	
	//calculate coordinate X and Y of canvas middle point
	canvas_mid_pos_y = canvas_width / 2 ;
	canvas_mid_pos_x = canvas_height / 2 ;
	
	ctx = document.getElementById("dice_canvas").getContext("2d");
	ctx.clearRect(0,0,canvas_width,canvas_height); // clear canvas			
	ctx.lineWidth= 5 ;
	
	var dice_num = Array() ;	//dice number 1~6

	for(  i = 0 ; i < 3 ; i++)
	{
		dice_num[i] = Math.floor(Math.random() * 6 ) + 1; // get random number of three dices
	}
	
	draw_sqrt_top_mid(dice_num[0]);
	draw_sqrt_btm_left(dice_num[1]);
	draw_sqrt_btm_right(dice_num[2]);
	var innerhtml = "<center>당신의 주사위의 합은 " + (dice_num[0] + dice_num[1] + dice_num[2]) + " 입니다.</center>";
	document.getElementById("cast_dice").innerHTML = innerhtml ;
	$("#dice_result").css("display","block")
}