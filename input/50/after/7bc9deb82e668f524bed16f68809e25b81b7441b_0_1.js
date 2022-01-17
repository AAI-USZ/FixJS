function zeroPad(str, length) {
	var zeros = "0000000000";
	while (length - str.length > zeros.length) 
		str = zeros + str;
	return zeros.substring(0, length-str.length) + str;
}