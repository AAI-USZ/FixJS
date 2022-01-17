function (context){
		clearBoard(context);
		context.beginPath();

		//vertical lines
		for (var x = 0; x <= style.board.width; x += style.piece.width){
			context.moveTo(0.5 + x, 0);
			context.lineTo(0.5 + x, style.board.width);
		}

		//horizontal lines
		for (var y = 0; y <= style.board.height; y += style.piece.height){
			context.moveTo(0, 0.5 + y);
			context.lineTo(style.board.height, 0.5 + y);
		}

		//ink Paths
		context.strokeStyle = style.board.lineColor;
    context.stroke();

		//trap squares
		for(var t = 0; t < board.traps.length; t++){
			var trap = board.traps[t];
			colorSquare(trap, style.board.trapSquareColor);
		}
	}