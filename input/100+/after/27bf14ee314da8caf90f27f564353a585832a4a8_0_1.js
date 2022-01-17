function( i,content ){
					devices=content["deviceNumber"];
					zoneID=content["zoneId"];
					zoneName=content["zoneName"];
					time=content["receiveTime"];
					deviceType=content["deviceType"];
					var zone=new ZoneFireInfo(content["zoneId"],content["deviceNumber"],'call');
					setDeviceNum(zone);zone=null;
					 $("#alarm_data").append("<p id="+devices+"><a href='javascript:linkZone("+zoneID+");'>报警:&nbsp;&nbsp;场地:"+zoneName+"(ID:"+zoneID+")&nbsp;&nbsp;设备:"+deviceType+"(ID:"+devices+")&nbsp;&nbsp;时间:"+time+"</a></p>");
					}