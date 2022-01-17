function(array){
	for(var i = array.length - 1, output = 0; i!== -1; output += array[i--]){}
	return output
}