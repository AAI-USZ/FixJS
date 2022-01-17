function init_time() {
	var timeFields = $(".input.time");
	var time = $("#timeField");
	var timeTitle = time.attr("title");
	timeFields.focus(function() {
		var self = $(this);
		if(self.val() == timeTitle) {
			self.val("");
		} 
	});
	timeFields.blur(function() {
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
				d = now;
				self.val( timeStr );
			} else {
				self.val( timeStr );
			}
			
			self.data("hours", d.getHours());
			self.data("minutes", d.getMinutes());
		}
	});
	
	// jeigu veiksmas vyksta tituliniame
	var titularDiv = $(".select-time");
	if(titularDiv.length > 0) {
		titularDiv.hide();
		var timeClone = $("#timeFieldClone");
		
		var sliderHours = titularDiv.find(".slider.hours");
		var textHours = titularDiv.find(".text.hours span");
		var sliderMinutes = titularDiv.find(".slider.minutes");
		var textMinutes = titularDiv.find(".text.minutes span");
		sliderChangeCallback = function(hours, minutes) {
			if(hours==undefined)
				hours = sliderHours.slider("value");
			if(isNaN(hours)) hours = 12;
			if(minutes==undefined)
				minutes = sliderMinutes.slider("value");
			if(isNaN(minutes)) minutes = 0;
			var timeStr = leadZeros(hours) +  ":" + leadZeros(minutes);
			time.val(timeStr);
		};
		
		time.blur(function() {
			timeClone.val(time.val());
			textHours.html(time.data("hours"));
			textMinutes.html(time.data("minutes"));
			sliderHours.slider("value", time.data("hours"));
			sliderMinutes.slider("value", time.data("minutes"));
		});
		timeClone.focus(function() {
			titularDiv.show(300);
			sliderHours.slider({
				value:12,
				min: 0,
				max: 23,
				step: 1,
				slide: function( event, ui ) {
					textHours.html(ui.value);
					sliderChangeCallback(ui.value, null);
				}
			});
			sliderMinutes.slider({ 
				value: 0,
				min: 0,
				max: 55,
				step: 5,
				slide: function( event, ui ) {
					textMinutes.html(ui.value);
					sliderChangeCallback(null, ui.value);
				}
			});
			time.blur();
			time.focus();
		});
		
		//$( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ) );
		
		
		time.focus(function(e) {
			if(titularDiv.hasClass("inactive")) {
				titularDiv.switchClass( "inactive", "active", 1000 );
			}
		});
		$("#addressField, #dateField").focus(function(e) {
			time.blur();
			titularDiv.hide(300);
			sliderHours.slider("destroy");
			sliderMinutes.slider("destroy");
		});
		
	}
}