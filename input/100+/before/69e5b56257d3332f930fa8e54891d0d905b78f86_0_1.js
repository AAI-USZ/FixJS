function(){
			var oneday = 24*60*60*1000;
			// convert to typeof(date)
			var baseend = baseenddate.value;
			var basesplit = baseend.split('/');
			var newbaseend = basesplit[2] + "-" + basesplit[0] + "-" + basesplit[1];
			// now convert to milliseconds
			var newbaseenddate = new Date(newbaseend).getTime();

			//convert to typeof(date);
			var contractend = contractenddate.value;
			var contsplit = contractend.split('/');
			var newcontractend = contsplit[2] + "-" + contsplit[0] + "-" + contsplit[1];
			// now convert to milliseconds
			var newcontractenddate = new Date(newcontractend).getTime();

			// find the difference between the dates and convert it from milliseconds to years, but we need to round it.
			var years = Math.round(Math.abs((newcontractenddate - newbaseenddate))/oneday/365) ;


			// Find the total number of timeline segments to be displayed.
			var divisor = years + 3;  //startdate/baseend/contractend + options
			var size = 100/divisor;
			$('.datesegment.option').remove();
			var thisyear = parseInt(basesplit[2]) + parseInt(years);
			var startday = parseInt(basesplit[1]);// + parseInt(years);
			for(i=years; i>0; i--){
				endyear = thisyear ;
				thisyear--;
				startday;
				$('.datesegment:eq(1)').after("<div class='datesegment option' id='option"+i+"'><span class='segmentname'>Option "+i+" Start Date</span><span class='segmentdate'>"+ contsplit[0] + "/" + startday + "/" + thisyear + "</span><span class='segmentenddate'>"+ contsplit[0] + "/" + startday + "/" + endyear + "</span></div>");
				$('#option'+i+'RateStart').empty().val(contsplit[0] + "/" + startday + "/" + thisyear);
			}
			$('.datesegment').css('width',(size-.25) + '%');

			sb.notify({
				type: 'options-set',
				data: years
			})

		}