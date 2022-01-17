function( i,content ){
					devices=content["deviceNumber"];
					zoneID=content["zoneId"];
					time=content["receiveTime"];
					var zone=new ZoneFireInfo(content["zoneId"],content["deviceNumber"],'call');
					setDeviceNum(zone);zone=null;
					 $("#alarm_data").append("<p id="+devices+"><a href='javascript:linkZone("+zoneID+");'>报警:&nbsp;&nbsp;场地ID "+zoneID+"  设备ID "+devices+" 时间："+time+"</a></p>");
					}