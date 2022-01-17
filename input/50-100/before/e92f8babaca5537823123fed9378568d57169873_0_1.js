function(key,value)
	{
		//Numbas.debug("set "+key+" := "+value,true);
		var val = pipwerks.SCORM.set('cmi.'+key,value);
		//Numbas.debug(pipwerks.SCORM.debug.getCode(),true);
		return val;
	}