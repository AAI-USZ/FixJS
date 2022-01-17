function refreshDateRange() {

        var full_range = '';
		var start_year = $("#start_year").val();
		var end_year   = $("#end_year").val();
		
		var start_month = parseInt($("#start_month").val(), 10) || '';
		var start_day   = parseInt($("#start_day").val(), 10)   || '';
		var end_month   = parseInt($("#end_month").val(), 10)   || '';
		var end_day     = parseInt($("#end_day").val(), 10)     || '';

		if(start_month > 0) { start_month = '-' + (start_month.length < 2 ? "0" + start_month : start_month); } // Pad with zeros 
		if(start_day > 0)   { start_day = '-' + (start_day.length < 2 ? "0" + start_day : start_day);         } // Pad with zeros
		if(end_month > 0) { end_month = '-' + (end_month.length < 2 ? "0" + end_month : end_month);           } // Pad with zeros
		if(end_day > 0)   {	end_day = '-' + (end_day.length < 2 ? "0" + end_day : end_day);                   } // Pad with zeros

        var start_range = start_year ? (start_year + (start_month && start_day ? start_month + start_day : '')) : '*';
        var end_range   = end_year   ? (end_year   + (end_month   && end_day   ? end_month   + end_day   : '')) : '*';
        
        if(start_range == '*' && end_range == '*') { full_range = ''; } else { full_range = start_range + ':' + end_range; }
		
		$("#insert-pubdate").html(full_range ? '&lt;input type="hidden" name="s.rf" value="PublicationDate,' + full_range + '" /&gt;<br />' : '');
		$("#search-refinements").html( $("#search-refinements").html() ); // Bug fix for Chrome
	}