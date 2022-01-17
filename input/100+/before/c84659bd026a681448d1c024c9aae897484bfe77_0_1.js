function() {
	var mColumns = [];
	
	$('table#groceryCrudTable thead tr th').each(function(index){
		if(!$(this).hasClass('actions'))
		{
			mColumns[index] = index;
		}
	});
	
	oTable = $('#groceryCrudTable').dataTable({
		"bJQueryUI": true,
		"sPaginationType": "full_numbers",
		"bStateSave": true,
		"iDisplayLength": default_per_page,
		"oLanguage":{
		    "sProcessing":   list_loading,
		    "sLengthMenu":   show_entries_string,
		    "sZeroRecords":  list_no_items,
		    "sInfo":         displaying_paging_string,
		    "sInfoEmpty":   list_zero_entries,
		    "sInfoFiltered": filtered_from_string,
		    "sSearch":       search_string+":",
		    "oPaginate": {
		        "sFirst":    paging_first,
		        "sPrevious": paging_previous,
		        "sNext":     paging_next,
		        "sLast":     paging_last
		    }		
		},
		"sDom": 'T<"clear"><"H"lfr>t<"F"ip>',
		//"sDom": 'T<"clear">lfrtip',
	    "oTableTools": {
	    	"aButtons": [
	    	                {
	    	                    "sExtends":    "xls",
	    	                    "sButtonText": "Excel",
	    	                    "mColumns": mColumns
	    	                },
	    	                {
	    	                    "sExtends":    "pdf",
	    	                    "sButtonText": "PDF",
	    	                    "mColumns": mColumns
	    	                },
	    	                {
	    	                    "sExtends":    "print",
	    	                    "sButtonText": "Print",
	    	                    "mColumns": mColumns
	    	                },	    	                
	    	],
	        "sSwfPath": base_url+"assets/grocery_crud/themes/datatables/extras/TableTools/media/swf/copy_csv_xls_pdf.swf"
	    }
	});

	$('a[role=button]').live("mouseover mouseout", function(event) {
		  if ( event.type == "mouseover" ) {
			  $(this).addClass('ui-state-hover');
		  } else {
			  $(this).removeClass('ui-state-hover');
		  }
	});	
	
	$('th.actions').unbind('click');
	$('th.actions>div').html($('th.actions>div').text());
	
}