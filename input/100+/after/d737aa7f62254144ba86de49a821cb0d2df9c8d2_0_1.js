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
				$("#days").html("0");
				$("#hours").html("00");
				$("#min").html("00");
				$("#sec").html("00");	
				options.action();
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
			if(hours < 10) hours = "0" + hours;
			if(min < 10) min = "0" + min;
			if(sec < 10) sec = "0" + sec;												
					
			$("#days").html(days);
			$("#hours").html(hours);
			$("#min").html(min);
			$("#sec").html(sec);					
		}