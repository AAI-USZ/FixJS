function(params){
		
		options = $.extend({}, defaults, params);
		var event_date = options.date.split("/");
		
		var t_event = {
			days  : parseInt(event_date[0]), 	
			hours : parseInt(event_date[1]),	
			min   : parseInt(event_date[2]),	
			sec   : parseInt(event_date[3])
		};
		
		var t = setInterval(timer, 1000);					
		
		function timer(){
		
			date = new Date();
									
			var now = {
				days  : date.getDate(),
				hours : date.getHours(),
				min   : date.getMinutes(),
				sec   : date.getSeconds()
			};
											
			t_event.total = t_event.days * 24 * 60 * 60 + t_event.hours * 60 * 60 + t_event.min * 60 + t_event.sec;			
			now.total =  now.days * 24 * 60 * 60 + now.hours * 60 * 60 + now.min * 60 + now.sec;			
			var diff = t_event.total - now.total;
						
			if(diff <= 0){
				clearInterval(t);
				$("#timer").html("00:00:00");
				alert("Time is up!");
				return false;
			};
						
			if(options.format == "long"){
				var days  = Math.floor(diff / (24 * 60 * 60));
				var hours = Math.floor((diff - days * 24 * 60 * 60) / (60 * 60));
				var min   = Math.floor((diff - days * 24 * 60 * 60 - hours * 60 * 60) / 60);
			}
			else{
				var hours = Math.floor(diff / (60 * 60));			
				var min   = Math.floor((diff - hours * 60 * 60) / 60);
			};
			var sec  = diff % 60;
			if(hours < 10) hour = "0" + hour;
			if(min < 10) min = "0" + min;
			if(sec < 10) sec = "0" + sec;												
					
			$("#days").html(days);
			$("#hours").html(hours);
			$("#min").html(min);
			$("#sec").html(sec);					
		};
		
		return this;
		
	}