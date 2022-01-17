function setStuff(req,res)
{
	//loops to false
	//If directcmd (e.g. direct signal to ardustat)
	if (req.body.directcmd != undefined) serialPort.write(req.body.directcmd)
	
	if (req.body.logger != undefined)
	{
		logger = req.body.logger
		everyxlog = parseInt(req.body.everyxlog)
		//console.log(logger)
		if (logger == "started")
		{
			console.log("Starting log")
			profix = req.body.datafilename + "_" + new Date().getTime().toString()
			datafile = profix
			if (db_connected) 
			{
				collection = db.collection(profix)	
			}
		}
		else if (logger = "stopped")
		{
			console.log("Stopping log")
		}
	}
	if (req.body.exportcsv != undefined)
	{	
		collectiontoexport = req.body.exportcsv
		console.log("Exporting database", collectiontoexport, "to CSV")
		mongoexportcmd = "mongoexport -csv -o ../CSVfiles/" + collectiontoexport + ".csv -d ardustat -c " + collectiontoexport + " -f time,cell_potential,working_potential,current"
		exec(mongoexportcmd, log_stdout)
	}
	var holdup = false
	//If abstracted command (potentiostat,cv, etc)
	if (req.body.command != undefined)
	{
		calibrate = false
		cv = false
		arb_cycling = false
		
		command = req.body.command;
		value = req.body.value;
		if (command == "calibrate")
		{
			console.log("Starting calibration");
			calibrator(req.body.value);
		}
		
		if (command == "ocv")
		{
			console.log("Setting OCV");
			ocv()
		}
		
		if (command == "potentiostat")
		{
			console.log("Setting potentiostat");
			potentiostat(value)
		}
		if (command == "galvanostat")
		{
			console.log("Setting galvanostat");
			galvanostat(value)
		}
		if (command == "moveground")
		{
			console.log("Setting ground");
			moveground(value)
		}
		if (command == "cv")
		{
			console.log("Setting cv");
			cv_start_go(value)
		}
		if (command == "find_error")
		{
			console.log("Finding error");
			find_error(value)
		}
		if (command == "cycling")
		{
			console.log("Setting cycler");
			cycling_start_go(value)
		}
		if (command == "startsavedcycling")
		{
			console.log("Setting cycler to saved settings:", value)
			startsavedcycling(value)
		}
		if (command == "idset") {
			console.log("Setting ID");
			set_id(value);
		}
		if (command == "blink") {
			console.log("Blinking")
			blink();
		}
		if (command == "upload_firmware") {
			console.log("Uploading firmware")
			upload_firmware();
		}
		if (command == "check_firmware") {
			console.log("Checking firmware")
			holdup = true
			check_firmware(req,res)
		}
	}
	
	if (req.body.programs != undefined)
	{
		if (req.body.programs == "cyclingsave")
		{
			value = req.body.value;
			holdup = true
			console.log("Saving cycler");
			holdup = true;
			cyclingsave(value,res)	
		}
		if (req.body.programs == "cyclingpresetsget")
		{
			holdup = true
			console.log("Getting cycler");
			holdup = true;
			db.collection("cycling_presets").find().toArray(function(err,data)
			{
				console.log(data)
				res.send(data)	
			})		
		}
	}
	if (!holdup) res.send(req.body)
	
}