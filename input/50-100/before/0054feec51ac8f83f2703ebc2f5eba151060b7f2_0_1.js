function calibrator(value)
{
	fs.unlinkSync("unit_"+id.toString()+".json")
	console.log("Deleted old calibration table")
	res_table = "null"
	rfixed = parseFloat(value)
	//console.log(rfixed)
	calibrate = false
	counter = 0
	calloop = 0
	queuer.push("R0255")
	setTimeout(function(){calibrate = true},100)
}