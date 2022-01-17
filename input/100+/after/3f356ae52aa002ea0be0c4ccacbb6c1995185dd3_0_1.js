function _replaceFromXML(str, r1)
	{
		exchWebService.commonFunctions.LOG("replaceFromXML: str:"+str+"|r1:"+r1);
		var result = str;
//try{
		if (r1.substr(0,1) == "#") {
			if (r1.substr(1,1) == "x") {
				// hexadecimal
				result = String.fromCharCode(parseInt(r1.substr(2),16))
			}
			else {
				// Decimal
				result = String.fromCharCode(parseInt(r1.substr(1),10))
			}
		}
		else {
			switch (r1) {
			case "amp": result = "&"; break;
			case "quot": result = '"'; break;
			case "apos": result = "'"; break;
			case "lt": result = "<"; break;
			case "gt": result = ">"; break;
			}
		}
//}
//catch(exc){ exchWebService.commonFunctions.LOG("replaceFromXML: Error:"+exc);}
		return result;
	}