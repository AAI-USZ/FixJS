function() {
		var self = $(this);
		var val = self.val();
		if(val == "") {
			self.val(timeTitle);
		} else {
			//console.log( d );
			//if(val.indexOf(':')==-1) val = val.substr(0,2) + ":" + val.substr(2);
			var time = val.match(/(\d+)(?::(\d\d))?\s*(p?)/) || [0,0,0];
			var hours = parseInt(time[1]) + (time[3] ? 12 : 0);
			var minutes = parseInt(time[2]) || 0;
			minutes = Math.round(minutes / timeAccuracyMinutes) * timeAccuracyMinutes;
			var d = new Date();
			d.setHours(hours);
			d.setMinutes(minutes);
			var timeStr = leadZeros(d.getHours())+":"+leadZeros(d.getMinutes());		
			
			// less than 20 minutes from now can't reserve
			var now = new Date();
			var letThrough = Math.ceil(Math.round(now.getTime()/1000)/300)*300+ 20 * 60;
			var setTo = $("#dateField").datepicker( "getDate" );//" "+timeStr;
			setTo.setHours(hours); setTo.setMinutes(minutes);
			var setToTS = setTo.getTime()/1000;//Date.parse( setTo ); 
			
			if( setToTS  < letThrough ) {
				now.setTime(letThrough*1000);
				timeStr = leadZeros(now.getHours())+":"+leadZeros(now.getMinutes())
				var dateStr = now.getFullYear()+"-"+leadZeros(d.getMonth())+"-"+leadZeros(d.getDate());
				$("#dateField").datepicker( 'setDate', dateStr );
				self.val( timeStr );
			} else {
				self.val( timeStr );
			}
			
		}
	}