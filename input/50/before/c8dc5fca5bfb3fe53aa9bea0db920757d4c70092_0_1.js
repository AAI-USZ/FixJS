function round (number, position){

		var tmp = Math.pow(10, position)

		return Math.round( number * tmp ) / tmp

	}