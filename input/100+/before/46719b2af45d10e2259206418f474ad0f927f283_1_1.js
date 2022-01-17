function init()
{
	ctx = $('#canvas')[0].getContext('2d');
	WIDTH = $('#canvas').width();
	HEIGHT = $('#canvas').height();
	paddle.width = 100;
	paddle.height = 35;	
	paddle.x = 0;
	paddle.y = HEIGHT-paddle.height;
	paddle.speed = 5;
	paddle.rescale = 1.0;
	$('#lives').html(lives);
	return setInterval(draw, 10);
}