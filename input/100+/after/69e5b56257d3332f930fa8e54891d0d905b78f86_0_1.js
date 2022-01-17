function(){
			var oneday = 24*60*60*1000;
			var baseend = baseenddate.value;
			var d = new Date(Date.parse(baseend));
			var o = new Date(Date.parse(baseend));
			///var basesplit = baseend.split('/');
			///var newbaseend = basesplit[2] + "-" + basesplit[0] + "-" + basesplit[1];
			// now convert to milliseconds
			///var newbaseenddate = new Date(newbaseend).getTime();

			//convert to typeof(date);
			///var contractend = contractenddate.value;
			var contractend = new Date(Date.parse(contractenddate.value));
			///var contsplit = contractend.split('/');
			///var newcontractend = contsplit[2] + "-" + contsplit[0] + "-" + contsplit[1];
			// now convert to milliseconds
			///var newcontractenddate = new Date(newcontractend).getTime();

			// find the difference between the dates and convert it from milliseconds to years, but we need to round it.
			///var years = Math.round(Math.abs((newcontractenddate.getTime() - newbaseenddate.getTime()))/oneday/365) ;

			var years = Math.round(Math.abs((contractend.getTime() - d.getTime()))/oneday/365);



			// Find the total number of timeline segments to be displayed. Do some math to get dimensions right.
			var divisor = years + 2;  
			var size = 100/divisor;
			//remove any existing options since the dates can be changed by the user.
			$('.datesegment.option').remove();
			///var thisyear = parseInt(basesplit[2]) + parseInt(years);
			var startyear = d.getFullYear() + years;
			var startday = d.getDate() + years + 1;
			////var startday = parseInt(basesplit[1]) + parseInt(years) + 1; // adding +1 to give the first option a start day one day after the base end day.


			/*
				var d = new Date(Date.parse(baseend));
				console.log(d);
				var day = d.getDate() + 1;
				console.log(day);
				d.setDate(day);
				years = 3;
				var year = d.getFullYear() + years;
				console.log(year);
				d.setFullYear(year);
				console.log(d);
			*/

			for(i=1; i<years; i++){
				var day = o.getDate() + 1;
				var year = o.getFullYear() + 1;
				o.setDate(day);
				o.setFullYear(year);
				
				m = o.getMonth() + 1;
				dt = o.getDate();
				yy = o.getFullYear();
				console.log(yy);
				endyear = yy + 1;
				var optionstart = m + "/" + dt + "/" + yy;
				var optionend  = m + "/" + dt + "/" + endyear;

				//optiondate = o.setDate(startday);
				//$('.datesegment:eq(1)').after("<div class='datesegment option' id='option"+i+"'><span class='segmentname'>Option "+i+" Start Date</span><span class='segmentdate'>"+ contsplit[0] + "/" + startday + "/" + thisyear + "</span><span class='segmentenddate'>"+ contsplit[0] + "/" + startday + "/" + endyear + "</span></div>");
				$('.datesegment:eq('+i+')').after("<div class='datesegment option' id='option"+i+"'><span class='segmentname'>Option "+i+" Start Date</span><span class='segmentdate'>"+optionstart+"</span><span class='segmentenddate'>"+ optionend + "</span></div>");
				//$('#option'+i+'RateStart').empty().val(contsplit[0] + "/" + startday + "/" + thisyear);
				$('#option'+i+'RateStart').empty().val(optionstart);
			}
			$('.datesegment').css('width',(size-.25) + '%');

			sb.notify({
				type: 'options-set',
				data: years-1
			})

		}