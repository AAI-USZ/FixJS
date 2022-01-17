function data_parse(data)
{
	parts = data.split(",")
  	out = {}

	//the raw data
	//console.log(data)
	out['dac_set'] = parseFloat(parts[1])
	out['cell_adc'] = parseFloat(parts[2])
	out['dac_adc'] = parseFloat(parts[3])
	out['res_set'] = parseFloat(parts[4])
	out['mode'] = parseInt(parts[6])
	out['gnd_adc'] = parseFloat(parts[8])
	out['ref_adc'] = parseFloat(parts[9])
	out['twopointfive_adc'] = parseFloat(parts[10])
	out['currentpin'] = parseFloat(parts[11])
	out['id'] = parseInt(parts[12])
	out['last_comm'] = last_comm
	//making sense of it
	volts_per_tick = 	5/1024
	if (vpt == undefined) vptt = volts_per_tick;
	if (id != out['id'])
	{
		id = out['id'];
		res_table = undefined
	}
    
	//force ocv when dac_set and dac_adc don't match up
    if (out['mode'] != 1 & out['dac_set'] - out['dac_adc'] > 900)
    {
		console.log("DAC setting and measurement differ by over 4.4V, setting OCV")
        ocv();
    }

	
	if (mode != out['mode'])
	{
		mode = out['mode'];
	}
	out['cell_potential'] = (out['cell_adc'] - out['gnd_adc']) * volts_per_tick
	out['dac_potential'] = (out['dac_adc'] - out['gnd_adc'])*volts_per_tick
	out['ref_potential'] = out['ref_adc']*volts_per_tick
	out['gnd_potential'] = out['gnd_adc']*volts_per_tick
	out['working_potential'] = (out['cell_adc'] - out['ref_adc']) * volts_per_tick
	last_potential = out['working_potential']
	
	out['Current_pin'] = (((out['currentpin']-out['gnd_adc'])*volts_per_tick)/resistance)*coefficient*-1
	out['Current Pin Resistance']=resistance
	out['Error']=((error-out['Current_pin'])/error)*100
	
	
	
	if (res_table == undefined)
	{
		try
		{
			res_table = JSON.parse(fs.readFileSync("unit_"+id.toString()+".json").toString())
			console.log("Loaded calibration table for ID#"+id.toString())
			
			
		}
		catch (err)
		{
			//console.log(err)
			console.log("Warning: Couldn't find calibration table for ID#"+id.toString())
			res_table = "null"
		}
	}
	
	if (res_table.constructor.toString().indexOf("Object")>-1)
	{
		if (customres == null) {
			out['resistance'] = res_table[out['res_set']]
		}
		else {
			out['resistance'] = customres
		}
		current = (out['dac_potential']-out['cell_potential'])/out['resistance']
		if (mode == 1) out['current'] = 0
		else if (high_current) out['current'] = out['Current_pin']
		else out['current'] = current
	}
	
	return out
}