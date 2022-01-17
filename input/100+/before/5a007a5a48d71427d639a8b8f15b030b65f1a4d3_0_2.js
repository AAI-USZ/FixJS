function refreshDateRange() {

		var start_year = $("#start_year").val();
		var end_year   = $("#end_year").val();
		
		if(end_year.length > 3) {
		
			var start_range = '*';
			var start_month = parseInt($("#start_month").val()) || '';
			var start_day   = parseInt($("#start_day").val()) || '';
			var end_month   = parseInt($("#end_month").val()) || '';
			var end_day     = parseInt($("#end_day").val()) || '';

			if(start_month > 0) { start_month = '-' + (start_month.length < 2 ? "0" + start_month : start_month); } // Pad with zeros 
			if(start_day > 0)   { start_day = '-' + (start_day.length < 2 ? "0" + start_day : start_day);         } // Pad with zeros
			if(start_year > 0)  { start_range = start_year + start_month + start_day; }
		
			if(end_month > 0) { end_month = '-' + (end_month.length < 2 ? "0" + end_month : end_month);           } // Pad with zeros
			if(end_day > 0)   {	end_day = '-' + (end_day.length < 2 ? "0" + end_day : end_day);                   } // Pad with zeros

			end_range = end_year + end_month + end_day;
			
			$("#insert-pubdate").html('&lt;input type="hidden" name="s.rf" value="PublicationDate,' + start_range + ':' + end_range + '" /&gt;<br />');
			$("#search-refinements").html( $("#search-refinements").html() ); // Bug fix for Chrome
		}

	}